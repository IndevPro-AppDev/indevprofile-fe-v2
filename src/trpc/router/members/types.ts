import type { Division, DivisionResponseData } from '../divisions/type'
import type { Periode, PeriodeResponseData } from '../periodes/types'

export interface MemberResponseData {
  id: number
  periode_id: number
  name: string
  division_id: number
  jabatan: string
  github: string | null
  linkedin: string | null
  ig: string | null
  website: string | null
  desc: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  back: string
  front: string
  division: DivisionResponseData
  periode: PeriodeResponseData
}

export interface Member {
  id: number
  name: string
  periode: Periode
  division: Division
  socials: Array<{
    slug: string
    url: string | null
  }>
  department: string
  image: {
    back: string
    front: string
  }
}

export function memberDto(json: MemberResponseData): Member {
  const valueOrNull = (value: string | null): string | null => {
    return value && value.trim() !== '' ? value : null
  }

  return {
    id: json.id,
    name: json.name,
    periode: {
      id: json.periode_id,
      name: json.periode.name
    },
    division: {
      id: json.division_id,
      name: json.division.name
    },
    socials: [
      { slug: 'github', url: valueOrNull(json.github) },
      { slug: 'linkedin', url: valueOrNull(json.linkedin) },
      { slug: 'ig', url: valueOrNull(json.ig) },
      { slug: 'website', url: valueOrNull(json.website) }
    ],
    department: json.jabatan,
    image: {
      front: json.front,
      back: json.back
    }
  }
}
