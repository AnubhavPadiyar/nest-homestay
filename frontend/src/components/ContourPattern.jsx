// Topographic contour-line pattern — used as a recurring motif
// across the Hero and Card components to evoke the ridgelines and
// elevation maps of the Uttarakhand Himalaya.
export default function ContourPattern({ className = '', opacity = 0.18 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M-20 250 C 60 210, 120 270, 200 230 S 340 190, 430 240" />
        <path d="M-20 210 C 70 175, 140 230, 210 195 S 330 150, 430 200" />
        <path d="M-20 170 C 80 140, 150 190, 220 160 S 320 115, 430 160" />
        <path d="M-20 130 C 90 105, 160 150, 230 125 S 310 80, 430 120" />
        <path d="M-20 90  C 100 70,  170 110, 240 90  S 300 50,  430 85" />
        <path d="M-20 50  C 110 35,  180 70,  250 55  S 290 25,  430 50" />
      </g>
    </svg>
  )
}
