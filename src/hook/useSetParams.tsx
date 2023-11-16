import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Props extends Record<string, any> { }

const useSetParams = () => {
  const [rawQuery, setRawQuery] = useState<Record<string, string>>({})

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()

  useEffect(() => {
    if (Object.keys(rawQuery).length == 0) return

    const params = new URLSearchParams(searchParams)
    for (let idx in Object.keys(rawQuery)) {
      params.set(
        Object.keys(rawQuery)[idx],
        encodeURIComponent(Object.values(rawQuery)[idx].toLowerCase())
      )
    }
    const enCodeParams = params.toString()
    route.replace(pathname + '?' + enCodeParams)   

  }, [rawQuery])

  return { setRawQuery }
}

export default useSetParams
