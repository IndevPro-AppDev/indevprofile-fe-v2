import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'

import IndevproScene from '~/components/indevpro-scene'
import GradientDropdown from '~/components/tentang-kami/button-tentang'
// import LogoMarquee from '~/components/marquee/logo-marquee'

export const Route = createFileRoute('/tentang-kami')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container mx-auto px-4">
    <div className="relative w-full max-w-screen overflow-x-hidden">
    <div className="container mx-auto">
        <div className="py-12 mb-6">
                <span
                    className="block text-[3.75rem] font-display leading-[100%] text-center bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-transparent">
                    Tentang IndevPro
                </span>
                <p className="mt-4 mx-auto max-w-[80rem] font-sans font-light text-[1rem] text-center text-white">
                    INDEVPRO adalah organisasi mahasiswa di bawah naungan Fakultas Teknologi Informasi, Universitas Merdeka Malang. Kami hadir sebagai wadah bagi mahasiswa untuk mengembangkan minat, kreativitas, dan kemampuan di bidang teknologi. Lewat berbagai pelatihan intensif, pengembangan proyek kolaboratif, dan jembatan ke industri, INDEVPRO membekali mahasiswa dengan keterampilan praktis dan pengalaman yang relevan. Di sini, kami berkomitmen penuh untuk mempersiapkan mahasiswa menjadi talenta profesional yang siap bersaing di dunia kerja.
                </p>
            </div>

            <section>
                <div className="flex justify-between">
                    <span className="font-display text-[1.5rem] bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-transparent">Tim Kami</span>
                    <div><GradientDropdown /></div>
                </div>
            </section>
    </div>

      <section className="flex h-[calc(100dvh-calc(var(--spacing)*14))] items-center justify-center">
        <div id="3d-scene" className="relative mx-auto h-64 w-64">
          <motion.div
            className="absolute top-0 left-0 h-full w-full"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0)' }}
            exit={{ opacity: 0 }}
            viewport={{ once: true }}
          >
            <IndevproScene />
          </motion.div>
        </div>
      </section>

    </div>
    </div>
  )
}
