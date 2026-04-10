import { Router } from "express"
import { supabaseAdmin } from "../lib/supabase-admin"

const router = Router()

router.post("/inventory-request", async (req, res) => {
  try {
    const { userId, requester, items } = req.body as {
      userId?: string
      requester?: { name?: string; college?: string; department?: string; phone?: string; purpose?: string }
      items?: { id: string; quantity: number }[]
    }

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" })
    }

    if (!requester || !requester.name || !requester.college || !requester.department || !requester.phone || !requester.purpose) {
      return res.status(400).json({ error: "Missing requester details" })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items selected" })
    }

    for (const item of items) {
      const { data: inv, error: invError } = await supabaseAdmin
        .from("inventory_items")
        .select("name, quantity_available")
        .eq("id", item.id)
        .single()

      if (invError || !inv) {
        return res.status(400).json({ error: "Invalid inventory item" })
      }

      if (inv.quantity_available < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${inv.name}` })
      }
    }

    const { data: requestData, error: requestError } = await supabaseAdmin
      .from("inventory_requests")
      .insert({
        user_id: userId,
        requester_name: requester.name,
        college: requester.college,
        department: requester.department,
        phone: requester.phone,
        purpose: requester.purpose,
        status: "submitted",
      })
      .select("id")
      .maybeSingle()

    if (requestError || !requestData) {
      console.error("Failed to create inventory request:", requestError)
      return res.status(500).json({ error: requestError?.message ?? "Failed to create request" })
    }

    const requestItems = items.map((item) => ({
      request_id: requestData.id,
      item_id: item.id,
      quantity: item.quantity,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from("inventory_request_items")
      .insert(requestItems)

    if (itemsError) {
      console.error("Failed to insert request items:", itemsError)
      return res.status(500).json({ error: itemsError.message })
    }

    return res.json({ success: true, requestId: requestData.id })
  } catch (error) {
    console.error("Inventory request error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/inventory-request/cancel", async (req, res) => {
  try {
    const { requestId, userId } = req.body as { requestId?: string; userId?: string }

    if (!requestId || !userId) {
      return res.status(400).json({ error: "Invalid payload" })
    }

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "cancelled" })
      .eq("id", requestId)
      .eq("user_id", userId)
      .eq("status", "submitted")

    if (error) {
      console.error("Cancel inventory request failed:", error)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ success: true })
  } catch (err: any) {
    console.error("Cancel inventory request error:", err)
    return res.status(500).json({ error: err.message || "Server error" })
  }
})

// ═══════════════ ADMIN ENDPOINTS ═══════════════

router.post("/admin/inventory-requests/approve", async (req, res) => {
  try {
    const { requestId } = req.body as { requestId?: string }

    if (!requestId) {
      return res.status(400).json({ error: "Missing requestId" })
    }

    // Get the request first
    const { data: request, error: getError } = await supabaseAdmin
      .from("inventory_requests")
      .select("id, status")
      .eq("id", requestId)
      .single()

    if (getError || !request) {
      console.error("Failed to fetch inventory request:", getError)
      return res.status(404).json({ error: "Request not found" })
    }

    // Update request status to approved
    const { error: updateError } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "approved" })
      .eq("id", requestId)

    if (updateError) {
      console.error("Failed to approve inventory request:", updateError)
      return res.status(500).json({ error: updateError.message })
    }

    return res.json({ success: true })
  } catch (error: any) {
    console.error("Admin approve request error:", error)
    return res.status(500).json({ error: error.message || "Server error" })
  }
})

router.post("/admin/inventory-requests/reject", async (req, res) => {
  try {
    const { requestId } = req.body as { requestId?: string }

    if (!requestId) {
      return res.status(400).json({ error: "Missing requestId" })
    }

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "rejected" })
      .eq("id", requestId)

    if (error) {
      console.error("Failed to reject inventory request:", error)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ success: true })
  } catch (error: any) {
    console.error("Admin reject request error:", error)
    return res.status(500).json({ error: error.message || "Server error" })
  }
})

router.post("/admin/inventory-requests/complete", async (req, res) => {
  try {
    const { requestId } = req.body as { requestId?: string }

    if (!requestId) {
      return res.status(400).json({ error: "Missing requestId" })
    }

    const { error } = await supabaseAdmin
      .from("inventory_requests")
      .update({ status: "completed" })
      .eq("id", requestId)

    if (error) {
      console.error("Failed to complete inventory request:", error)
      return res.status(500).json({ error: error.message })
    }

    return res.json({ success: true })
  } catch (error: any) {
    console.error("Admin complete request error:", error)
    return res.status(500).json({ error: error.message || "Server error" })
  }
})

export default router
