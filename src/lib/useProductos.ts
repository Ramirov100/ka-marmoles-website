import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { PRODUCTOS, type Producto } from '../data/productos'

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS)
  const [loading, setLoading] = useState<boolean>(!!supabase)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('productos')
      .select('*')
      .order('nombre')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) setProductos(data as Producto[])
        setLoading(false)
      })
  }, [])

  return { productos, loading }
}
