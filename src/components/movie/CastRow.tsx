import Image from 'next/image'
import { CastMember } from '@/types/tmdb'
import { getImageUrl } from '@/lib/tmdb'

interface Props {
  cast: CastMember[]
}

export default function CastRow({ cast }: Props) {
  const top = cast.slice(0, 10)

  if (!top.length) return null

  return (
    <section className="mt-10">
      <h2 className="text-white text-xl font-bold mb-4">Top Cast</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {top.map(member => {
          const photo = getImageUrl(member.profile_path, 'w300')
          return (
            <div key={member.id} className="shrink-0 w-24 flex flex-col items-center gap-2">
              {/* Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 border border-white/10">
                {photo ? (
                  <Image
                    src={photo}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                    👤
                  </div>
                )}
              </div>
              {/* Name */}
              <p className="text-white text-xs font-medium text-center line-clamp-2">{member.name}</p>
              {/* Character */}
              <p className="text-gray-400 text-[10px] text-center line-clamp-2">{member.character}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}