import type { Credential } from '@/lib/types'

interface Props {
  credentials: Credential[]
}

export default function Credentials({ credentials }: Props) {
  const byType = {
    registration: credentials.filter((c) => c.type === 'registration'),
    accreditation: credentials.filter((c) => c.type === 'accreditation'),
    certification: credentials.filter((c) => c.type === 'certification'),
    netZero: credentials.filter((c) => c.type === 'net-zero-tools'),
    tech: credentials.filter((c) => c.type === 'tech-innovation'),
    australian: credentials.filter((c) => c.type === 'australian-membership'),
  }

  return (
    <section id="credentials" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="section-label">Credentials</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
              {byType.registration.length > 0 && (
                <CredentialGroup label="Professional Registration" items={byType.registration} />
              )}
              {byType.accreditation.length > 0 && (
                <CredentialGroup label="Sustainability Accreditations" items={byType.accreditation} />
              )}
              {byType.certification.length > 0 && (
                <CredentialGroup label="Certifications" items={byType.certification} />
              )}
              {byType.netZero.length > 0 && (
                <CredentialGroup label="Net Zero & Carbon Tools" items={byType.netZero} />
              )}
              {byType.tech.length > 0 && (
                <CredentialGroup label="Tech & Innovation" items={byType.tech} />
              )}
              {byType.australian.length > 0 && (
                <CredentialGroup label="Australian Credentials & Memberships" items={byType.australian} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CredentialGroup({ label, items }: { label: string; items: Credential[] }) {
  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-stone-400 mb-4 pb-2 border-b border-stone-200 dark:border-stone-800 font-medium" style={{ letterSpacing: '0.14em' }}>
        {label}
      </p>
      <ul className="space-y-3">
        {items.map((cred) => (
          <li key={cred.id} className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-snug">{cred.title}</p>
              {cred.subtitle && (
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{cred.subtitle}</p>
              )}
              {cred.issuer && cred.issuer !== '[To be added]' && (
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{cred.issuer}</p>
              )}
            </div>
            {cred.year && (
              <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0 mt-0.5">{cred.year}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
