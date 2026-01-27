"use client"

import { useState, useMemo } from "react"
import { supabase } from "@/lib/supabase"

/* ================= CONFIG ================= */

const GPAY_QR_URL =
  "https://res.cloudinary.com/dvrc3jqve/image/upload/v1769405493/unnamed_z5x3tk.jpg"

const COST_3D_PER_GRAM = 5
const COST_LASER_PER_SQFT = 150

/* ================= TYPES ================= */

type UploadState = {
  file?: File
  url?: string
  progress: number
  error?: string
}

/* ================= HELPERS ================= */

async function uploadToCloudinary(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "idea_lab_profiles")

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dvrc3jqve/image/upload",
    { method: "POST", body: formData }
  )

  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return data.secure_url as string
}

async function uploadSTL(file: File) {
  const { data, error } = await supabase.storage
    .from("incubation-stl")
    .upload(`${Date.now()}-${file.name}`, file)

  if (error) throw error

  const { data: url } = supabase.storage
    .from("incubation-stl")
    .getPublicUrl(data.path)

  return url.publicUrl
}

/* ================= PAGE ================= */

export default function IncubationRequestPage() {
  const [type, setType] = useState<"3d" | "laser">("3d")

  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    contact: "",
    weight: "",
    area: "",
    date: "",
    time: "",
  })

  const [slice, setSlice] = useState<UploadState>({ progress: 0 })
  const [stl, setStl] = useState<UploadState>({ progress: 0 })
  const [payment, setPayment] = useState<UploadState>({ progress: 0 })

  const estimatedCost = useMemo(() => {
    return type === "3d"
      ? Number(form.weight || 0) * COST_3D_PER_GRAM
      : Number(form.area || 0) * COST_LASER_PER_SQFT
  }, [form, type])

  const formProgress = useMemo(() => {
    const fields = [
      form.name,
      form.email,
      form.contact,
      form.date,
      form.time,
      slice.url,
      stl.url,
      payment.url,
    ]
    return Math.round((fields.filter(Boolean).length / fields.length) * 100)
  }, [form, slice, stl, payment])

  async function handleUpload(
    file: File,
    setter: (u: UploadState) => void,
    uploader: (f: File) => Promise<string>
  ) {
    setter({ file, progress: 15 })
    try {
      const url = await uploader(file)
      setter({ file, url, progress: 100 })
    } catch (e: any) {
      setter({ file, progress: 0, error: e.message })
    }
  }

  async function submit() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from("incubation_requests").insert({
      user_id: user?.id,
      name: form.name,
      email: form.email,
      contact_number: form.contact,
      request_type: type === "3d" ? "3d_printing" : "laser_printing",
      approx_weight_grams: type === "3d" ? form.weight : null,
      approx_area_sqft: type === "laser" ? form.area : null,
      estimated_cost: estimatedCost,
      sliced_model_screenshot_url: slice.url,
      design_files_urls: [stl.url],
      payment_screenshot_url: payment.url,
      preferred_date: form.date,
      preferred_time: form.time,
    })

    alert("Request submitted successfully")
  }

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 space-y-14">

        {/* ================= HEADER ================= */}

        <section className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
            AICTE IDEA LAB – Incubation Team
            <br />
            3D Printing & Laser Printing Request Form
          </h1>

          <p className="text-neutral-300 leading-relaxed max-w-3xl">
            3D Printing Cost: ₹5 per gram | Laser Printing Cost: ₹150 per sq. ft. (For laser printing contact)
            <br />
            For more details contact project coordinator : Jithin Joseph (9895221439)
          </p>

          <ul className="list-disc pl-5 text-sm text-neutral-400 space-y-1">
            <li>
              Use of <b>external or third-party materials</b> is strictly prohibited
            </li>
            <li>
              Printing will be done <b>only using Idea Lab resources</b>
            </li>
          </ul>
        </section>

        {/* ================= TOGGLE ================= */}

        <div className="inline-flex bg-white/5 backdrop-blur rounded-full p-1">
          {["3d", "laser"].map(v => (
            <button
              key={v}
              onClick={() => setType(v as any)}
              className={`px-6 py-2.5 rounded-full text-sm transition ${
                type === v
                  ? "bg-orange-500 text-black shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {v === "3d" ? "3D Printing" : "Laser Printing"}
            </button>
          ))}
        </div>

        {/* ================= FORM ================= */}

        <section className="space-y-10">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Input label="Name" onChange={v => setForm({ ...form, name: v })} />
            <Input label="E-mail" onChange={v => setForm({ ...form, email: v })} />
            <Input label="Contact number" onChange={v => setForm({ ...form, contact: v })} />
          </div>

          {type === "3d" && (
            <Input
              label="3D Printing Details ( Approximate Weight (in grams) )"
              onChange={v => setForm({ ...form, weight: v })}
            />
          )}

          {type === "laser" && (
            <Input
              label="Laser Printing Details ( Approximate Area (in sq. ft.) )"
              onChange={v => setForm({ ...form, area: v })}
            />
          )}

          <div className="text-xl font-semibold text-orange-400">
            Estimated cost: ₹{estimatedCost}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input type="date" label="Preferred Printing Date" onChange={v => setForm({ ...form, date: v })} />
            <Input type="time" label="Preferred Printing Time" onChange={v => setForm({ ...form, time: v })} />
          </div>

          <UploadBox
            label="Upload sliced model screenshot (weight visible)"
            state={slice}
            onFile={f => handleUpload(f, setSlice, uploadToCloudinary)}
            preview
          />

          <UploadBox
            label="Design file upload (STL)"
            state={stl}
            onFile={f => handleUpload(f, setStl, uploadSTL)}
          />
        </section>

        {/* ================= PAYMENT ================= */}

        <section className="space-y-6">
          <h2 className="text-xl font-medium">Scan to pay</h2>

          <div className="bg-white rounded-2xl p-6 inline-block">
            <img src={GPAY_QR_URL} className="w-60 rounded-xl" />
            <p className="text-black text-sm text-center mt-3">
              Scan to pay with any UPI app
            </p>
          </div>

          <UploadBox
            label="Payment screenshot"
            state={payment}
            onFile={f => handleUpload(f, setPayment, uploadToCloudinary)}
            preview
          />
        </section>

        {/* ================= PROGRESS ================= */}

        <div className="space-y-2">
          <div className="text-sm text-neutral-400">
            Form completion: {formProgress}%
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${formProgress}%` }}
            />
          </div>
        </div>

        {/* ================= SUBMIT ================= */}

        <button
          onClick={submit}
          className="w-full bg-orange-500 hover:bg-orange-400 transition text-black py-4 rounded-2xl text-lg font-semibold shadow-xl"
        >
          Submit request
        </button>
      </div>
    </main>
  )
}

/* ================= COMPONENTS ================= */

function Input({
  label,
  onChange,
  type = "text",
}: {
  label: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        type={type}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition"
      />
    </div>
  )
}

function UploadBox({
  label,
  state,
  onFile,
  preview,
}: {
  label: string
  state: UploadState
  onFile: (f: File) => void
  preview?: boolean
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="text-sm text-neutral-300">{label}</div>

      {!state.file && (
        <label className="flex flex-col items-center justify-center border border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:border-orange-500 transition text-sm text-neutral-300">
          Drag & drop file here or
          <span className="text-orange-400 font-medium mt-1">Choose file</span>
          <input
            type="file"
            className="hidden"
            onChange={e => e.target.files && onFile(e.target.files[0])}
          />
        </label>
      )}

      {state.file && (
        <div className="space-y-3">
          <div className="text-sm">{state.file.name}</div>

          {preview && state.url && (
            <img src={state.url} className="w-32 rounded-lg" />
          )}

          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all"
              style={{ width: `${state.progress}%` }}
            />
          </div>

          <div className="text-xs text-neutral-400">
            Uploading… {state.progress}%
          </div>

          <label className="text-sm text-orange-400 cursor-pointer hover:underline">
            Choose another file
            <input
              type="file"
              hidden
              onChange={e => e.target.files && onFile(e.target.files[0])}
            />
          </label>

          {state.error && (
            <button
              onClick={() => onFile(state.file!)}
              className="text-sm text-red-400 underline"
            >
              Retry upload
            </button>
          )}
        </div>
      )}
    </div>
  )
}
