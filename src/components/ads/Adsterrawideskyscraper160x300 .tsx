'use client'

/**
 * AdsterraWideSkyscraper160x300
 *
 * SPEC:
 *   Network : Adsterra
 *   Format  : iframe (script-injected)
 *   Size    : 160 × 300  (Wide Skyscraper)
 *   Key     : 2b4763a632635876b91bca00071fc21d
 *
 * USAGE:
 *   import AdsterraWideSkyscraper160x300 from '@/components/ads/AdsterraWideSkyscraper160x300'
 *   <AdsterraWideSkyscraper160x300 />
 *
 * NOTES:
 *   - Must be a Client Component — Adsterra sets a global `atOptions`
 *     variable and injects an iframe, both of which require the browser.
 *   - useEffect fires after mount so there is no SSR hydration mismatch.
 *   - The `injected` ref guard prevents double-injection in React Strict
 *     Mode (which intentionally mounts components twice in development).
 *   - Scripts are scoped to the wrapper div, not document.head, so they
 *     are naturally removed when the component unmounts.
 */

import { useEffect, useRef } from 'react'

const AD_KEY    = '2b4763a632635876b91bca00071fc21d'
const AD_WIDTH  = 160
const AD_HEIGHT = 300

export default function AdsterraWideSkyscraper160x300() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const injected   = useRef(false)

  useEffect(() => {
    if (!wrapperRef.current || injected.current) return
    injected.current = true

    // 1. Set atOptions before the invoke script loads
    const optionsScript = document.createElement('script')
    optionsScript.innerHTML = `
      atOptions = {
        'key'    : '${AD_KEY}',
        'format' : 'iframe',
        'height' : ${AD_HEIGHT},
        'width'  : ${AD_WIDTH},
        'params' : {}
      };
    `

    // 2. Load the Adsterra invoke script
    const invokeScript = document.createElement('script')
    invokeScript.src   = `https://www.highperformanceformat.com/${AD_KEY}/invoke.js`
    invokeScript.async = true

    wrapperRef.current.appendChild(optionsScript)
    wrapperRef.current.appendChild(invokeScript)
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width    : AD_WIDTH,
        height   : AD_HEIGHT,
        overflow : 'hidden',
        flexShrink: 0,
      }}
      aria-label="Advertisement"
    />
  )
}