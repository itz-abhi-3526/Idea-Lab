import { Router } from "express"
import { supabaseAdmin } from "../lib/supabase-admin"

const router = Router()

/* ─────────────── SUBMIT REQUEST ─────────────── */
router.post("/inventory-request", async (req, res) => {
  try {
    const { userId, requester, items } = req.body

    // 1. Validation matching your UI and Database
    if (!userId || !requester?.name || !items?.length) {
      return res.status(400).json({ error: "Invalid request: Missing User ID, Name, or Items" })
    }

    // 2. Stock Check (Prevents requesting more than available)
    for (const item of items) {
      const { data: inv } = await supabaseAdmin
        .from("inventory_items")
        .select("name, quantity_available")
        .eq("id", item.id)
        .single()

      if (!inv || inv.quantity_available < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${inv?.name || 'item'}` })
      }
    }

    // 3. Create the main request entry (Matching your Supabase columns)
    const { data: requestData, error: requestError } = await supabaseAdmin
      .from("inventory_requests")
      .insert({
        user_id: userId,
        requester_name: requester.name,
        college: requester.college || "FISAT",
        department: requester.department,
        phone: requester.phone,
        purpose: requester.purpose,
        status: "submitted",
      })
      .select("id")
      .single()

    if (requestError) throw requestError

    // 4. Create the item links in inventory_request_items
    const requestItems = items.map((item: any) => ({
      request_id: requestData.id,
      item_id: item.id,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from("inventory_request_items")
      .insert(requestItems)

    if (itemsError) throw itemsError

    return res.json({ success: true, requestId: requestData.id })
  } catch (error: any) {
    console.error("Inventory Error:", error.message)
    return res.status(500).json({ error: error.message || "Internal server error" })
  }
})

/* ─────────────── CANCEL REQUEST ─────────────── */
router.post("/inventory-request/cancel", async (req, res) => {
  try {
    const { requestId, userId } = req.body

    if (!requestId || !userId) {
      return res.status(400).json({ error: "Invalid payload: Missing requestId or userId" })
    }

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "cancelled" })
      .eq("id", requestId)
      .eq("user_id", userId)
      .eq("status", "submitted")

    if (error) throw error

    return res.json({ success: true })
  } catch (err: any) {
    console.error("Cancel Error:", err.message)
    return res.status(500).json({ error: err.message || "Server error" })
  }
})

/* ─────────────── ADMIN ENDPOINTS ─────────────── */

router.post("/admin/inventory-requests/approve", async (req, res) => {
  try {
    const { requestId } = req.body
    if (!requestId) return res.status(400).json({ error: "Missing requestId" })

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "approved" })
      .eq("id", requestId)

    if (error) throw error
    return res.json({ success: true })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})

router.post("/admin/inventory-requests/reject", async (req, res) => {
  try {
    const { requestId } = req.body
    if (!requestId) return res.status(400).json({ error: "Missing requestId" })

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "rejected" })
      .eq("id", requestId)

    if (error) throw error
    return res.json({ success: true })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})

router.post("/admin/inventory-requests/complete", async (req, res) => {
  try {
    const { requestId } = req.body
    if (!requestId) return res.status(400).json({ error: "Missing requestId" })

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "completed" })
      .eq("id", requestId)

    if (error) throw error
    return res.json({ success: true })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
})

export default router