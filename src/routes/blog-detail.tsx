import { createFileRoute } from '@tanstack/react-router'
import {
  Facebook,
  MessageCircleMore,
  MoveLeft,
  MoveRight,
  Twitter
} from 'lucide-react'

export const Route = createFileRoute('/blog-detail')({
  component: RouteComponent
})

function RouteComponent() {
  const shareUrl = 'https://indevprofile.id/blog-detail'

  return (
    <div className="w-full max-w-screen overflow-x-hidden px-4 py-8">
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-1 hidden xl:block" />
        <div className="col-span-12 space-y-12 xl:col-span-8 xl:col-start-3">
          <div className="space-y-3">
            <h1 className="light bg-gradient-to-r from-[#5A7EB9] to-[#2B3E5C] bg-clip-text text-[96px] font-bold text-transparent">
              Judul Artikel
            </h1>
            <div className="flex items-center justify-between text-[24px] text-[#F8FAFC]">
              <span>28 Juni 2025</span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Bagikan ke Facebook"
                >
                  <Facebook size={90} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Bagikan ke X"
                >
                  <Twitter size={90} />
                </a>
                <a
                  href={`https://wa.me/?text=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Bagikan ke WhatsApp"
                >
                  <MessageCircleMore size={90} />
                </a>
              </div>
            </div>
          </div>

          <div className="relative grid w-full place-items-center overflow-hidden rounded-xl">
            <img
              src="/blank.png"
              alt="Gambar blog"
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="relative grid w-full place-items-center space-y-6 text-justify">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              feugiat, nisi nec ullamcorper efficitur, turpis est hendrerit
              neque, nec tempus sapien tellus et sapien. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Integer malesuada justo vitae ex bibendum volutpat.
              Nullam sodales varius eros, nec scelerisque arcu consequat vel.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit. Et harum quidem rerum facilis est
              et expedita distinctio.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident. Similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              feugiat, nisi nec ullamcorper efficitur, turpis est hendrerit
              neque, nec tempus sapien tellus et sapien. Pellentesque habitant
              morbi tristique senectus et netus et malesuada fames ac turpis
              egestas. Integer malesuada justo vitae ex bibendum volutpat.
              Nullam sodales varius eros, nec scelerisque arcu consequat vel.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident. Similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio.
            </p>
          </div>

          <div className="mx-auto flex justify-between text-sm font-medium">
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
            >
              <MoveLeft className="h-4 w-4" />
              Post Sebelumnya
            </button>
            <button
              type="button"
              className="flex items-center gap-1 hover:underline"
            >
              Post Selanjutnya
              <MoveRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mx-auto">
            <h2 className="mb-4 text-xl font-semibold">Related Posts</h2>
            <div className="grid grid-cols-8 gap-6">
              {[1, 2].map((_, index) => (
                <div key={index} className="col-span-4 space-y-2">
                  <div className="relative h-40 w-full overflow-hidden rounded-lg">
                    <img
                      src="/blank.png"
                      alt={`Gambar blog ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="text-base font-medium">
                    Judul Postingan {index + 1}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 hidden xl:block" />
      </div>
    </div>
  )
}
