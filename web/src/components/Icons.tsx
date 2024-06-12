import { cn } from "@/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;
const className = "w-6 h-6";

export const Icons = {
  home: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, props.className)}
      stroke="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 13V19"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M3 10.49C3 7.36999 8.87 2 12 2C15.13 2 21 7.36999 21 10.49V18.07C20.9816 19.1187 20.5521 20.1182 19.804 20.8533C19.0558 21.5883 18.0488 22.0002 17 22H7C5.95115 22.0002 4.9442 21.5883 4.19603 20.8533C3.44786 20.1182 3.01835 19.1187 3 18.07V10.47"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  ),
  cardAdd: (props: IconProps) => (
    <svg
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, props.className)}
      stroke="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M10.58 3.96997H6C4.93913 3.96997 3.92172 4.39146 3.17157 5.1416C2.42142 5.89175 2 6.9091 2 7.96997V17.97C2 19.0308 2.42142 20.0482 3.17157 20.7983C3.92172 21.5485 4.93913 21.97 6 21.97H18C19.0609 21.97 20.0783 21.5485 20.8284 20.7983C21.5786 20.0482 22 19.0308 22 17.97V13.8999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M10.58 9.96997H2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M5 18.9199H11"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M18 10.9199V2.91992"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M14 6.91992H22"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  ),
  fundsOut: (props: IconProps) => (
    <svg
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlnsk="http://www.w3.org/2000/svg"
      className={cn(className, props.className)}
      stroke="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12.8702 16.97V18.0701C12.8702 18.2478 12.7995 18.4181 12.6739 18.5437C12.5482 18.6694 12.3778 18.74 12.2001 18.74C12.0224 18.74 11.852 18.6694 11.7264 18.5437C11.6007 18.4181 11.5302 18.2478 11.5302 18.0701V16.9399C11.0867 16.8668 10.6625 16.7051 10.2828 16.4646C9.90316 16.2241 9.57575 15.9097 9.32013 15.54C9.21763 15.428 9.16061 15.2817 9.16016 15.1299C9.16006 15.0433 9.17753 14.9576 9.21155 14.8779C9.24557 14.7983 9.29545 14.7263 9.35809 14.6665C9.42074 14.6067 9.49484 14.5601 9.57599 14.5298C9.65713 14.4994 9.7436 14.4859 9.83014 14.49C9.91602 14.4895 10.0009 14.5081 10.0787 14.5444C10.1566 14.5807 10.2254 14.6338 10.2802 14.7C10.6 15.1178 11.0342 15.4338 11.5302 15.6099V13.0701C10.2002 12.5401 9.53015 11.77 9.53015 10.76C9.55019 10.2193 9.7627 9.70353 10.1294 9.30566C10.4961 8.9078 10.9929 8.65407 11.5302 8.59009V7.47998C11.5302 7.30229 11.6007 7.13175 11.7264 7.0061C11.852 6.88045 12.0224 6.81006 12.2001 6.81006C12.3778 6.81006 12.5482 6.88045 12.6739 7.0061C12.7995 7.13175 12.8702 7.30229 12.8702 7.47998V8.58008C13.2439 8.63767 13.6021 8.76992 13.9234 8.96924C14.2447 9.16856 14.5226 9.43077 14.7402 9.73999C14.8284 9.85568 14.8805 9.99471 14.8901 10.1399C14.8928 10.2256 14.8783 10.3111 14.8473 10.3911C14.8163 10.4711 14.7696 10.5439 14.7099 10.6055C14.6502 10.667 14.5787 10.7161 14.4998 10.7495C14.4208 10.7829 14.3359 10.8001 14.2501 10.8C14.1607 10.7989 14.0725 10.7787 13.9915 10.7407C13.9104 10.7028 13.8384 10.648 13.7802 10.5801C13.5417 10.2822 13.2274 10.054 12.8702 9.91992V12.1699L13.1202 12.27C14.3902 12.76 15.1802 13.4799 15.1802 14.6299C15.163 15.2399 14.9149 15.8208 14.4862 16.2551C14.0575 16.6894 13.4799 16.9449 12.8702 16.97ZM11.5302 11.5901V9.96997C11.3688 10.0285 11.2298 10.1363 11.1329 10.2781C11.0361 10.4198 10.9862 10.5884 10.9902 10.76C10.9984 10.93 11.053 11.0945 11.1483 11.2356C11.2435 11.3767 11.3756 11.4889 11.5302 11.5601V11.5901ZM13.7302 14.6599C13.7302 14.1699 13.3902 13.8799 12.8702 13.6599V15.6599C13.1157 15.6254 13.3396 15.5009 13.4985 15.3105C13.6574 15.1202 13.74 14.8776 13.7302 14.6299V14.6599Z"
          fill="#000000"
        ></path>{" "}
        <path
          d="M12.58 3.96997H6C4.93913 3.96997 3.92178 4.39146 3.17163 5.1416C2.42149 5.89175 2 6.9091 2 7.96997V17.97C2 19.0308 2.42149 20.0482 3.17163 20.7983C3.92178 21.5485 4.93913 21.97 6 21.97H18C19.0609 21.97 20.0783 21.5485 20.8284 20.7983C21.5786 20.0482 22 19.0308 22 17.97V11.8999"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M16.3398 8.57992L21.9998 2.91992"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M17.4805 2.91992H22.0005V7.44992"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  ),
  history: (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, props.className)}
      stroke="currentColor"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M7.00001 4.10999C6.14022 4.33198 5.37874 4.83376 4.83558 5.53625C4.29241 6.23875 3.99845 7.10201 4.00001 7.98999V17.99C4.00001 19.0509 4.42149 20.0682 5.17164 20.8184C5.92178 21.5685 6.93914 21.99 8.00001 21.99H16C17.0609 21.99 18.0783 21.5685 18.8284 20.8184C19.5786 20.0682 20 19.0509 20 17.99V7.98999C19.9993 7.10372 19.7044 6.24269 19.1614 5.54224C18.6184 4.84178 17.8581 4.34156 17 4.12"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M9 5.98999C8.46957 5.98999 7.96089 5.77925 7.58582 5.40417C7.21074 5.0291 7 4.52042 7 3.98999C7 3.45956 7.21074 2.95088 7.58582 2.57581C7.96089 2.20073 8.46957 1.98999 9 1.98999H15C15.5304 1.98999 16.0392 2.20073 16.4142 2.57581C16.7893 2.95088 17 3.45956 17 3.98999C17 4.52042 16.7893 5.0291 16.4142 5.40417C16.0392 5.77925 15.5304 5.98999 15 5.98999H9Z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M8 16H14"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
        <path
          d="M8 12H16"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  ),
  bankLogo: (props: IconProps) => (
    <svg
      viewBox="0 -140 780 780"
      enableBackground="new 0 0 780 500"
      version="1.1"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      stroke="currentColor"
      fill="#fff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="m736.04 0h-694.58c-22.887 0-41.458 18.994-41.458 42.426v414.65c0 23.437 18.562 42.426 41.458 42.426h694.58c22.888 0 41.459-18.994 41.459-42.426v-414.65c0-23.436-18.562-42.426-41.459-42.426zm-581.62 353.64l-49.177-180.32c-17.004-9.645-36.407-17.397-58.104-22.77l0.706-4.319h89.196c12.015 0.457 21.727 4.38 25.075 17.527l19.392 95.393 4e-3 0.011 5.77 28.77 54.155-141.57h58.594l-87.085 207.2-58.526 0.07zm188.7 0.177h-55.291l-1e-3 -1e-3 34.585-207.61h55.315l-34.608 207.61zm96.259 3.08c-24.807-0.26-48.697-5.28-61.618-11.075l7.764-46.475 7.126 3.299c18.167 7.751 29.929 10.897 52.068 10.897 15.899 0 32.957-6.357 33.094-20.272 0.103-9.088-7.136-15.577-28.666-25.753-20.982-9.932-48.777-26.572-48.47-56.403 0.328-40.355 38.829-68.514 93.487-68.514 21.445 0 38.618 4.514 49.577 8.72l-7.498 44.998-4.958-2.397c-10.209-4.205-23.312-8.24-41.399-7.954-21.655 0-31.678 9.229-31.678 17.858-0.126 9.724 11.715 16.134 31.05 25.736 31.913 14.818 46.65 32.791 46.44 56.407-0.428 43.094-38.174 70.928-96.319 70.928zm239.65-3.014s-5.074-23.841-6.729-31.108c-8.067 0-64.494-0.09-70.842-0.09-2.147 5.615-11.646 31.198-11.646 31.198h-58.086l82.151-190.26c5.815-13.519 15.724-17.216 28.967-17.216h42.742l44.772 207.48h-51.329z"
          fill="#fff"
        ></path>
        <path
          d="m617.38 280.22c4.574-11.963 22.038-58.036 22.038-58.036-0.327 0.554 4.54-12.019 7.333-19.813l3.741 17.898s10.59 49.557 12.804 59.949h-45.917l1e-3 2e-3z"
          fill="transparent"
        ></path>
      </g>
    </svg>
  ),
};
