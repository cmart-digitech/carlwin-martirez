import { getContent } from '@/lib/content'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const content = getContent()
  return <AdminDashboard initialContent={content} />
}
