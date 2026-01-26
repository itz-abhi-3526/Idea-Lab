'use client'

import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Shield, User, Search, Download } from 'lucide-react'

type UserRecord = {
  id: string
  email: string
  name: string | null
  role: 'admin' | 'guest' | null
  created_at: string
  last_sign_in_at: string | null
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'guest'>('all')

  /* ------------------ FETCH USERS ------------------ */
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('id, email, name, role, created_at, last_sign_in_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('FETCH USERS ERROR:', error)
      }

      if (data) setUsers(data as UserRecord[])
      setLoading(false)
    }

    fetchUsers()
  }, [])

  /* ------------------ FILTERED USERS ------------------ */
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase()

      const matchesSearch =
        user.email.toLowerCase().includes(query) ||
        (user.name?.toLowerCase().includes(query) ?? false)

      const matchesRole =
        roleFilter === 'all' || user.role === roleFilter

      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  /* ------------------ CSV EXPORT ------------------ */
  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Joined At', 'Last Sign In']

    const rows = filteredUsers.map((u) => [
      u.name || u.email.split('@')[0],
      u.email,
      u.role || 'guest',
      new Date(u.created_at).toLocaleString(),
      u.last_sign_in_at
        ? new Date(u.last_sign_in_at).toLocaleString()
        : 'Never',
    ])

    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'idea_lab_users.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  /* ------------------ STATES ------------------ */
  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading users…</p>
  }

  if (!users.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No users visible (check RLS policy / admin role).
      </p>
    )
  }

  return (
    <div className="space-y-8 pt-6 sm:pt-8 md:pt-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Registered Users</h1>
        <p className="text-muted-foreground text-sm">
          Users who have signed in to IDEA Lab
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-card border border-border text-sm focus:outline-none"
            />
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as 'all' | 'admin' | 'guest')
            }
            className="px-3 py-2 rounded-xl bg-card border border-border text-sm"
          >
            <option value="all">All</option>
            <option value="admin">Admins</option>
            <option value="guest">Guests</option>
          </select>
        </div>

        {/* Export */}
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent border border-accent/30 text-sm hover:bg-accent/20 transition"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => {
          const isAdmin = user.role === 'admin'

          return (
            <div
              key={user.id}
              className="
                glass-surface
                rounded-2xl
                p-5
                soft-shadow
                flex
                flex-col
                justify-between
                min-h-[180px]
              "
            >
              {/* TOP SECTION */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      {isAdmin ? (
                        <Shield className="w-5 h-5 text-accent" />
                      ) : (
                        <User className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold leading-tight truncate">
                        {user.name || user.email.split('@')[0]}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs border ${
                      isAdmin
                        ? 'bg-accent/10 text-accent border-accent/30'
                        : 'bg-muted/10 text-muted-foreground border-border'
                    }`}
                  >
                    {isAdmin ? 'Admin' : 'Guest'}
                  </span>
                </div>
              </div>

              {/* BOTTOM META */}
              <div className="pt-4 mt-4 border-t border-border/40 text-xs text-muted-foreground space-y-1">
                <p>
                  Joined on {new Date(user.created_at).toLocaleDateString()}
                </p>
                <p>
                  Last sign-in:{' '}
                  {user.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : 'Never'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
