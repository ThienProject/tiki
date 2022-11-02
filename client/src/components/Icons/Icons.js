export const StarIcon = ({ width = '14', height = '14', className, color = '#c7c7c7' }) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        size="14"
        color={color}
        className={className}
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"

        /*  style={{ color: 'rgb(199, 199, 199)' }} */
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
    </svg>
);
export const ZaloIcon = ({ width = '33', height = '33', className }) => (
    <svg
        className={className}
        height={height}
        width={width}
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
            fill="#3171F6"
        ></path>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0002 5.99984C10.1091 5.99984 5.3335 10.4556 5.3335 15.9522C5.3335 19.0351 6.83597 21.7903 9.19473 23.6158V27.3332L12.8261 25.4565C13.8287 25.7477 14.8948 25.9046 16.0002 25.9046C21.8912 25.9046 26.6668 21.4488 26.6668 15.9522C26.6668 10.4556 21.8912 5.99984 16.0002 5.99984ZM9.87701 18.0804C10.6612 18.0804 11.3932 18.0759 12.125 18.0821C12.5362 18.0856 12.7584 18.2607 12.7962 18.5845C12.8442 18.9944 12.605 19.2664 12.1609 19.2714C11.3233 19.2809 10.4855 19.275 9.64768 19.275C9.40587 19.275 9.16349 19.2835 8.92244 19.2696C8.62187 19.2523 8.32787 19.1928 8.18415 18.8827C8.04006 18.5719 8.14015 18.293 8.33911 18.04C9.13968 17.0219 9.9412 16.0047 10.7422 14.9869C10.7898 14.9265 10.8357 14.8648 10.882 14.8043C10.833 14.7159 10.7554 14.7555 10.6949 14.7551C10.1336 14.7516 9.57215 14.7556 9.01082 14.7511C8.88254 14.7501 8.75044 14.7398 8.62701 14.7074C8.36663 14.6391 8.20854 14.4307 8.20644 14.182C8.20434 13.9329 8.35768 13.722 8.61749 13.6487C8.74025 13.6141 8.87282 13.6021 9.00111 13.6016C9.9252 13.5978 10.8493 13.5981 11.7734 13.6011C11.9367 13.6016 12.1011 13.6058 12.2597 13.6606C12.6101 13.7815 12.7643 14.1045 12.6219 14.4465C12.4978 14.7442 12.3001 14.9973 12.1027 15.2486C11.4252 16.1108 10.7452 16.9709 10.0663 17.8322C10.0136 17.899 9.96292 17.9676 9.87701 18.0804ZM14.0567 17.2472C14.0617 17.4255 14.1205 17.6652 14.2747 17.8732C14.6102 18.3257 15.2984 18.3243 15.6337 17.8723C15.9242 17.4805 15.9227 16.8304 15.6319 16.4389C15.4782 16.2321 15.273 16.1238 15.0169 16.1087C14.4487 16.0753 14.0509 16.5148 14.0567 17.2472ZM15.8889 15.3525C16.0151 15.1936 16.1404 15.0439 16.3538 15.0005C16.7609 14.9174 17.147 15.182 17.1525 15.596C17.1661 16.6319 17.161 17.668 17.1549 18.7041C17.1532 18.987 16.9789 19.2039 16.7239 19.2906C16.4567 19.3814 16.1783 19.3152 15.9998 19.09C15.9124 18.9797 15.875 18.9607 15.7531 19.0596C15.2812 19.4422 14.7489 19.5091 14.1735 19.3225C13.2505 19.023 12.8705 18.3038 12.7703 17.4228C12.6626 16.4766 12.9776 15.6645 13.8246 15.1666C14.5277 14.7532 15.2421 14.788 15.8889 15.3525ZM20.7838 17.1508C20.7824 17.416 20.8448 17.6634 21.0047 17.8783C21.3324 18.3189 22.0136 18.3224 22.348 17.8879C22.6494 17.4962 22.6504 16.8305 22.353 16.4346C22.1979 16.2282 21.9918 16.1217 21.7364 16.1082C21.1766 16.0785 20.7862 16.5065 20.7838 17.1508ZM19.4806 17.276C19.4411 15.9452 20.3142 14.9509 21.556 14.9127C22.8756 14.8721 23.8436 15.7594 23.883 17.0529C23.9229 18.3626 23.1194 19.2917 21.8803 19.416C20.5341 19.5509 19.4614 18.57 19.4806 17.276ZM19.0266 16.2455C19.0266 17.0484 19.0306 17.8513 19.025 18.6542C19.0218 19.1134 18.6166 19.4239 18.1809 19.3139C17.9192 19.2479 17.7236 18.9703 17.7231 18.6468C17.7211 17.2741 17.7223 15.9014 17.7223 14.5287C17.7223 14.287 17.7189 14.0451 17.7231 13.8035C17.7301 13.4051 17.9837 13.1465 18.3649 13.1428C18.7586 13.1389 19.0226 13.3985 19.0252 13.811C19.0302 14.6225 19.0266 15.434 19.0266 16.2455Z"
            fill="white"
        ></path>
    </svg>
);
export const YoutubeIcon = ({ width = '33', height = '33', className }) => (
    <svg
        className={className}
        height={height}
        width={width}
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
            fill="#FF0000"
        ></path>
        <path
            d="M24.1768 12.7153C23.9805 11.9613 23.4022 11.3675 22.6679 11.166C21.3371 10.7998 16.0001 10.7998 16.0001 10.7998C16.0001 10.7998 10.6632 10.7998 9.3323 11.166C8.59795 11.3675 8.01962 11.9613 7.82335 12.7153C7.4668 14.0818 7.4668 16.9331 7.4668 16.9331C7.4668 16.9331 7.4668 19.7843 7.82335 21.151C8.01962 21.905 8.59795 22.4987 9.3323 22.7003C10.6632 23.0665 16.0001 23.0665 16.0001 23.0665C16.0001 23.0665 21.3371 23.0665 22.6679 22.7003C23.4022 22.4987 23.9805 21.905 24.1768 21.151C24.5335 19.7843 24.5335 16.9331 24.5335 16.9331C24.5335 16.9331 24.5335 14.0818 24.1768 12.7153Z"
            fill="white"
        ></path>
        <path d="M14.3999 19.8665V14.5332L18.6666 17.2L14.3999 19.8665Z" fill="#FF0000"></path>
    </svg>
);
export const FacebookIcon = ({ width = '33', height = '33', className }) => (
    <svg
        className={className}
        height={height}
        width={width}
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0 16.6665C0 7.82995 7.16344 0.666504 16 0.666504C24.8366 0.666504 32 7.82995 32 16.6665C32 25.5031 24.8366 32.6665 16 32.6665C7.16344 32.6665 0 25.5031 0 16.6665Z"
            fill="#3B5998"
        ></path>
        <path
            d="M17.6676 26.0742V17.3693H20.0706L20.389 14.3696H17.6676L17.6717 12.8682C17.6717 12.0858 17.7461 11.6666 18.8698 11.6666H20.372V8.6665H17.9687C15.082 8.6665 14.066 10.1217 14.066 12.5689V14.3699H12.2666V17.3696H14.066V26.0742H17.6676Z"
            fill="white"
        ></path>
    </svg>
);
export const ChatIcon = ({ width = '18', height = '18', className }) => (
    <svg className={className} width={width} height={height} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8.25C0 3.95165 4.15905 0.75 9 0.75C13.8409 0.75 18 3.95165 18 8.25C18 10.0141 17.2499 11.5969 16.0855 12.8642L16.4951 16.414C16.5254 16.6772 16.4147 16.9369 16.2037 17.0972C15.9927 17.2575 15.7128 17.2946 15.4674 17.1947L11.2797 15.4913C10.5273 15.6864 9.78118 15.75 9 15.75C4.15905 15.75 0 12.5483 0 8.25ZM9 2.25C4.69095 2.25 1.5 5.04835 1.5 8.25C1.5 11.4517 4.69095 14.25 9 14.25C9.77869 14.25 10.451 14.1792 11.1095 13.9816C11.2734 13.9325 11.4491 13.9408 11.6076 14.0053L14.8598 15.3282L14.5549 12.686C14.5287 12.4585 14.6078 12.2316 14.7697 12.0697C15.8609 10.9785 16.5 9.66018 16.5 8.25C16.5 5.04835 13.3091 2.25 9 2.25Z"
            fill="#0d5cb6"
        ></path>
    </svg>
);

export const FastIcon = () => {
   return <svg 
        width="34" height="10" viewBox="0 0 34 10" fill="none" 
        xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.907853 0.25043C0.739301 0.277892 0.589557 0.35121 0.470383 0.470383C0.315525 0.651052 0.238095 0.83172 0.238095 1.06401V8.93599C0.238095 9.16828 0.315525 9.37476 0.470383 9.52962C0.625242 9.68447 0.83172 9.7619 1.08982 9.7619C1.10434 9.7619 1.11865 9.7616 1.13278 9.761C1.11867 9.7616 1.10436 9.7619 1.08986 9.7619C0.831764 9.7619 0.625286 9.68447 0.470427 9.52961C0.315568 9.37475 0.238139 9.16827 0.238139 8.93598V1.064C0.238139 0.831713 0.315568 0.651045 0.470427 0.470376C0.58959 0.351213 0.739319 0.277897 0.907853 0.25043ZM5.58914 1.80886C5.56097 1.81128 5.53235 1.81248 5.50333 1.81248H1.94158V1.81249H5.50329C5.53233 1.81249 5.56096 1.81128 5.58914 1.80886ZM4.9697 5.78357C4.94154 5.78598 4.91292 5.78719 4.8839 5.78719H1.94158V5.7872H4.88386C4.91289 5.7872 4.94152 5.78599 4.9697 5.78357ZM2.17964 8.93599V6.02529H4.88386C5.17104 6.02529 5.44081 5.9283 5.64584 5.72327C5.84234 5.52676 5.94786 5.28666 5.94786 5.0129C5.94786 4.73491 5.85595 4.45573 5.63833 4.2693C5.43425 4.06936 5.16754 3.97471 4.88386 3.97471H2.17964V2.05059H5.50329C5.79047 2.05059 6.06025 1.95359 6.26528 1.74856C6.46178 1.55206 6.5673 1.31195 6.5673 1.0382C6.5673 0.760201 6.47538 0.481021 6.25776 0.294591C6.05368 0.0946525 5.78698 0 5.50329 0H1.06401C0.776828 0 0.507051 0.0969977 0.302024 0.302024L0.295559 0.30849L0.289608 0.315433C0.103734 0.532285 0 0.766333 0 1.06401V8.93599C0 9.22317 0.0969978 9.49295 0.302024 9.69798C0.509439 9.90539 0.780707 10 1.08982 10C1.38749 10 1.62154 9.89627 1.83839 9.71039C2.08052 9.50285 2.17964 9.22547 2.17964 8.93599Z"
            fill="#FFB700"
        ></path>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.1719 0.776126L7.85598 8.80005C7.8507 8.82118 7.84541 8.84121 7.84036 8.86037C7.8212 8.933 7.80536 8.99308 7.80536 9.05317C7.80536 9.25567 7.85598 9.40754 7.98254 9.55941C8.03 9.60687 8.08458 9.64721 8.14628 9.6791C8.0846 9.64722 8.03003 9.60688 7.98258 9.55943C7.85602 9.40756 7.8054 9.25568 7.8054 9.05319C7.8054 8.9931 7.82125 8.93301 7.84041 8.86038C7.84546 8.84123 7.85074 8.8212 7.85602 8.80007L11.1719 0.776142C11.2478 0.598958 11.3491 0.472398 11.501 0.371149C11.6528 0.269901 11.8047 0.219277 11.9819 0.244589C12.06 0.244589 12.1331 0.254418 12.2014 0.274084C12.1331 0.25441 12.0599 0.244573 11.9818 0.244573C11.8047 0.219261 11.6528 0.269885 11.5009 0.371133C11.349 0.472381 11.2478 0.598942 11.1719 0.776126ZM15.0191 9.70258C14.9659 9.67886 14.9149 9.64801 14.8675 9.61005C14.7409 9.5088 14.6397 9.38224 14.5637 9.20506L13.8803 7.58509H13.8803L14.5637 9.20504C14.6396 9.38223 14.7409 9.50879 14.8674 9.61004C14.9149 9.648 14.9659 9.67885 15.0191 9.70258ZM9.09313 9.79596C9.24596 9.6737 9.37899 9.51216 9.44744 9.28516L10.0642 7.82316H13.7223L14.3443 9.29759L14.3448 9.29883C14.4363 9.51221 14.5617 9.67036 14.7187 9.79596C14.8882 9.93153 15.0927 10 15.2977 10C15.5432 10 15.7725 9.89554 15.9564 9.74232L15.9647 9.73541L15.9723 9.72777C16.1718 9.52833 16.2699 9.28925 16.2699 8.97723C16.2699 8.8339 16.2334 8.70088 16.1769 8.55975L12.9662 0.722576C12.8979 0.495001 12.7629 0.329513 12.5779 0.203997C12.4111 0.0735582 12.2142 0.00970286 11.9984 0.00659737C11.7551 -0.0234711 11.5502 0.0521285 11.3688 0.173026C11.175 0.302287 11.0454 0.466837 10.953 0.682328L7.62924 8.72531L7.62499 8.7423C7.62179 8.75513 7.61796 8.7694 7.61382 8.78483L7.61381 8.78486C7.59406 8.85852 7.56726 8.95844 7.56726 9.05317C7.56726 9.3065 7.63442 9.51358 7.79963 9.71184L7.80654 9.72013L7.81418 9.72777C7.98976 9.90335 8.22959 10 8.51409 10C8.71914 10 8.92367 9.93153 9.09313 9.79596ZM10.5897 6.04103H13.2474L11.9312 2.9024L11.9313 2.90236L13.2475 6.04105H10.5897L10.5897 6.04103ZM12.8894 5.80294H10.9504L11.9291 3.51303L12.8894 5.80294Z"
            fill="#FFB700"
        ></path>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M23.747 4.88926L23.7471 4.88907L23.7383 4.88263C23.443 4.6679 23.0941 4.48022 22.6667 4.34668C22.2578 4.2189 21.7728 4.09127 21.2368 3.98916L21.2361 3.98904C20.8481 3.9163 20.508 3.81919 20.2149 3.72149C19.9491 3.63291 19.7828 3.52764 19.638 3.38472C19.5333 3.25918 19.4754 3.09336 19.4754 2.89474C19.4754 2.72335 19.532 2.57778 19.6197 2.47194C19.7454 2.32575 19.914 2.1988 20.1277 2.1133C20.3408 2.02808 20.6338 1.97995 20.9917 1.97995C21.1737 1.97995 21.3773 2.0172 21.6303 2.06345L21.6907 2.07449C21.9464 2.14497 22.1816 2.23887 22.3988 2.33537C22.6062 2.42757 22.7876 2.54167 22.9195 2.65158L22.9242 2.65549L22.929 2.65915C23.0618 2.75868 23.236 2.83208 23.4228 2.83208C23.6906 2.83208 23.9254 2.7288 24.1175 2.53678C24.3095 2.34476 24.4128 2.10988 24.4128 1.8421C24.4128 1.47818 24.2408 1.18914 23.9475 0.954429L23.9475 0.954396L23.9439 0.95163C23.598 0.685574 23.1756 0.448628 22.678 0.265307L22.678 0.265277L22.6744 0.263993C22.143 0.0780302 21.5893 0 20.9917 0C20.3653 0 19.781 0.104191 19.2444 0.344725C18.702 0.56272 18.2682 0.916173 17.9441 1.34837C17.6073 1.79747 17.4453 2.3513 17.4453 2.96992C17.4453 3.3649 17.4977 3.74971 17.6391 4.08907C17.775 4.41515 17.9688 4.72252 18.251 4.97647C18.5266 5.22453 18.8519 5.41253 19.2187 5.56972C19.596 5.73141 20.0443 5.83542 20.5285 5.91187L20.5285 5.91188L20.5303 5.91215C21.0227 5.986 21.4299 6.08299 21.7333 6.19967C22.0443 6.31929 22.2448 6.44943 22.3551 6.59649L22.3598 6.60269L22.3648 6.60858C22.4713 6.73287 22.5331 6.89996 22.5331 7.13032C22.5331 7.2987 22.4795 7.42829 22.3656 7.52599L22.3586 7.53194L22.3522 7.5384C22.2044 7.68617 22.0349 7.79406 21.7875 7.88401C21.5406 7.97378 21.2678 8.02005 20.9666 8.02005C20.5134 8.02005 20.1173 7.94821 19.824 7.83542C19.5306 7.72256 19.2025 7.5139 18.8899 7.24932L18.8899 7.24925L18.8848 7.24515C18.7133 7.10792 18.5091 7.0426 18.2849 7.0426C17.9963 7.0426 17.7603 7.14279 17.5652 7.3379C17.3732 7.52992 17.2699 7.7648 17.2699 8.03258C17.2699 8.18733 17.3006 8.35125 17.3947 8.51507C17.4696 8.68857 17.6038 8.8147 17.7303 8.91635C18.2065 9.33849 18.711 9.60399 19.2157 9.76338L19.2157 9.7634L19.219 9.76439C19.7455 9.92233 20.3203 9.99999 20.9416 9.99999C21.5707 9.99999 22.1547 9.89489 22.7146 9.65493C23.2745 9.41497 23.7098 9.09025 24.063 8.62834C24.4238 8.15652 24.5882 7.62815 24.5882 7.00501C24.5882 6.52635 24.5082 6.12128 24.3718 5.76666C24.2333 5.40649 24.0345 5.11933 23.747 4.88926ZM19.8607 1.97642C19.9171 1.94549 19.9767 1.91729 20.0393 1.89223C20.2899 1.79198 20.6158 1.74185 20.9917 1.74185C21.1966 1.74185 21.4221 1.78321 21.6684 1.82836L21.7069 1.83539C21.694 1.83304 21.6812 1.83069 21.6684 1.82835C21.4222 1.7832 21.1966 1.74184 20.9917 1.74184C20.6158 1.74184 20.29 1.79197 20.0393 1.89222C19.9767 1.91728 19.9171 1.94548 19.8607 1.97642ZM21.7162 1.8371L21.7436 1.8421C22.0193 1.91729 22.2699 2.01754 22.4955 2.11779C22.721 2.21804 22.9215 2.34336 23.0719 2.46867C23.1722 2.54386 23.2975 2.59398 23.4228 2.59398C23.5167 2.59398 23.6052 2.57747 23.6882 2.54444C23.6052 2.57747 23.5168 2.59397 23.4228 2.59397C23.2975 2.59397 23.1722 2.54385 23.0719 2.46866C22.9215 2.34335 22.721 2.21803 22.4955 2.11778C22.2699 2.01753 22.0193 1.91728 21.7436 1.84209C21.7344 1.84043 21.7253 1.83877 21.7162 1.8371ZM18.8159 0.839696C18.5497 1.01934 18.3225 1.2406 18.1346 1.49122C17.8338 1.89222 17.6834 2.39347 17.6834 2.96991C17.6834 3.34585 17.7336 3.69673 17.8589 3.99748C17.9842 4.29823 18.1596 4.57392 18.4103 4.79949C18.6609 5.02505 18.9616 5.20049 19.3125 5.35086C19.6634 5.50124 20.0895 5.60149 20.5657 5.67668C21.0669 5.75187 21.493 5.85212 21.8188 5.97743C22.1446 6.10274 22.3952 6.25312 22.5456 6.45362C22.696 6.62906 22.7712 6.85462 22.7712 7.13031C22.7712 7.35587 22.696 7.55638 22.5205 7.70675C22.4986 7.72869 22.4763 7.74983 22.4535 7.77025C22.4763 7.74984 22.4986 7.72869 22.5205 7.70676C22.696 7.55639 22.7711 7.35589 22.7711 7.13032C22.7711 6.85463 22.696 6.62907 22.5456 6.45363C22.3952 6.25313 22.1446 6.10275 21.8188 5.97744C21.493 5.85213 21.0669 5.75188 20.5656 5.67669C20.0894 5.6015 19.6634 5.50125 19.3125 5.35087C18.9616 5.2005 18.6609 5.02506 18.4102 4.7995C18.1596 4.57393 17.9842 4.29824 17.8589 3.99749C17.7336 3.69674 17.6834 3.34586 17.6834 2.96992C17.6834 2.39348 17.8338 1.89223 18.1346 1.49123C18.3225 1.2406 18.5497 1.01934 18.8159 0.839696ZM17.7912 7.45339C17.7715 7.46984 17.7524 7.48746 17.7336 7.50626C17.5832 7.65664 17.508 7.83208 17.508 8.03258C17.508 8.15789 17.5331 8.2832 17.6082 8.40852C17.6584 8.53383 17.7586 8.63408 17.8839 8.73433C18.3351 9.13533 18.8113 9.38596 19.2874 9.53634C19.7887 9.68671 20.3401 9.7619 20.9416 9.7619C21.2447 9.7619 21.5351 9.73644 21.8159 9.68232C21.5351 9.73644 21.2447 9.76189 20.9416 9.76189C20.3401 9.76189 19.7887 9.6867 19.2875 9.53632C18.8113 9.38595 18.3351 9.13532 17.884 8.73432C17.7586 8.63407 17.6584 8.53382 17.6083 8.40851C17.5331 8.28319 17.508 8.15788 17.508 8.03257C17.508 7.83207 17.5832 7.65663 17.7336 7.50625C17.7524 7.48746 17.7715 7.46984 17.7912 7.45339Z"
            fill="#FFB700"
        ></path>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.491 0.250931C26.3245 0.277925 26.1766 0.346271 26.0587 0.444566C25.9038 0.573615 25.8264 0.780093 25.8264 1.01238C25.8264 1.24467 25.9038 1.45115 26.0587 1.5802C26.2135 1.73505 26.42 1.78667 26.6523 1.78667H28.7945V8.93598C28.7945 9.16827 28.8719 9.37475 29.0526 9.5296C29.2075 9.68446 29.414 9.76189 29.672 9.76189C29.6882 9.76189 29.7042 9.7616 29.7201 9.76099C29.7042 9.7616 29.6881 9.7619 29.672 9.7619C29.4139 9.7619 29.2074 9.68447 29.0526 9.52961C28.8719 9.37475 28.7945 9.16827 28.7945 8.93599V1.78668H26.6523C26.42 1.78668 26.2135 1.73506 26.0586 1.5802C25.9038 1.45115 25.8264 1.24468 25.8264 1.01239C25.8264 0.7801 25.9038 0.573622 26.0586 0.444573C26.1766 0.34627 26.3245 0.27792 26.491 0.250931ZM32.8034 1.7831C32.7752 1.78547 32.7466 1.78667 32.7176 1.78667H30.5754V1.78668H32.7176C32.7466 1.78668 32.7752 1.78547 32.8034 1.7831ZM25.5883 1.01239C25.5883 1.29042 25.6802 1.56964 25.8979 1.75607C26.114 1.96711 26.3903 2.02478 26.6523 2.02478H28.5564V8.93599C28.5564 9.22269 28.6536 9.49754 28.8907 9.70441C29.0973 9.90734 29.3661 10 29.672 10C29.9737 10 30.274 9.90961 30.4856 9.69797C30.6772 9.5064 30.8134 9.24183 30.8134 8.93599V2.02478H32.7176C33.0034 2.02478 33.2643 1.92919 33.4636 1.76311C33.6873 1.57672 33.7816 1.29394 33.7816 1.01239C33.7816 0.734355 33.6896 0.455136 33.4719 0.268706C33.2559 0.0576708 32.9795 0 32.7176 0H26.6523C26.3665 0 26.1055 0.0955878 25.9062 0.261663C25.6825 0.448059 25.5883 0.730832 25.5883 1.01239Z"
            fill="#FFB700"
        ></path>
    </svg>;
};
