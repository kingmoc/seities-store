import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // console.log(pathname, 'pathname from RemoveID')

  useEffect(() => {
    if (!pathname.includes('checkout')) {
        localStorage.removeItem('cart-id')
    }
  }, [pathname]);

  return null;
}