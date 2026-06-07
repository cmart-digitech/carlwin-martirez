import { getContent } from '@/lib/content'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminPage() {
  const content = getContent()
  return <AdminDashboard initialContent={content} />
}
