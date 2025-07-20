import { createFileRoute } from '@tanstack/react-router'

import CardMember from '~/components/about/card-member'
import YearsFilter from '~/components/about/years-filter'

export const Route = createFileRoute('/about')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className="container mx-auto px-4">
      <div className="relative w-full max-w-screen overflow-x-hidden">
        <div className="container mx-auto">
          <div className="mb-6 py-12">
            <span className="font-display block bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-center text-[3.75rem] leading-[100%] text-transparent">
              Tentang IndevPro
            </span>
            <p className="mx-auto mt-4 max-w-[80rem] text-center font-sans text-[1rem] font-light text-white">
              INDEVPRO adalah organisasi mahasiswa di bawah naungan Fakultas
              Teknologi Informasi, Universitas Merdeka Malang. Kami hadir
              sebagai wadah bagi mahasiswa untuk mengembangkan minat,
              kreativitas, dan kemampuan di bidang teknologi. Lewat berbagai
              pelatihan intensif, pengembangan proyek kolaboratif, dan jembatan
              ke industri, INDEVPRO membekali mahasiswa dengan keterampilan
              praktis dan pengalaman yang relevan. Di sini, kami berkomitmen
              penuh untuk mempersiapkan mahasiswa menjadi talenta profesional
              yang siap bersaing di dunia kerja.
            </p>
          </div>

          <section>
            <div className="container flex justify-between px-8">
              <span className="font-display bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-[1.5rem] text-transparent">
                Tim Kami
              </span>
              <div>
                <YearsFilter />
              </div>
            </div>

            <div className="container flex justify-center">
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                <CardMember />
                <CardMember />
                <CardMember />
                <CardMember />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
