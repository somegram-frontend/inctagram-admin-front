import { type Ref, type SVGProps, forwardRef, memo } from "react";

const PolygonSvg = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>,
) => (
  <svg
    width="8"
    height="5"
    viewBox="0 0 8 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="currentColor" />
  </svg>
);
const ForwardRef = forwardRef(PolygonSvg);
const Memo = memo(ForwardRef);

export default Memo;
