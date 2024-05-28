import { positionP1, positionP2 } from "../testScript.js";

//toggle the theme from dark to light and vice-versa
export function changeTheme() {
  const root = document.documentElement;
  const newTheme = root.className === "dark" ? "light" : "dark";
  const currentTheme = root.className === "dark" ? "dark" : "light";
  root.className = newTheme;
  const themeButton = document.getElementById("theme-button");
  themeButton.textContent = currentTheme;
}

export const Icons = {
  titan: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><style>.cls-1{fill:#1e0f00}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="_1" data-name="1"><path class="cls-1" d="M37 11H11a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3h3V1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3h3V1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1zM12 9h24V2h-3v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V2h-4v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V2h-3zM0 46h48v2H0z"/><path class="cls-1" d="M33 48H15a1 1 0 0 1-1-1V15a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v32a1 1 0 0 1-1 1zm-17-2h16V16H16z"/><path class="cls-1" d="M28 48h-8a1 1 0 0 1-1-1V37a5 5 0 0 1 10 0v10a1 1 0 0 1-1 1zm-7-2h6v-9a3 3 0 0 0-6 0zM28 29h-8a1 1 0 0 1-1-1v-4a5 5 0 0 1 10 0v4a1 1 0 0 1-1 1zm-7-2h6v-3a3 3 0 0 0-6 0zM35 16H13a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm-21-2h20v-3H14zM13 32H1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3h3v-3a1 1 0 0 1 1-1h2v2h-1v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3H2v7h11z"/><path class="cls-1" d="M2 31h2v16H2zM47 32H35v-2h11v-7h-3v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-3h-1v-2h2a1 1 0 0 1 1 1v3h3v-3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1z"/><path class="cls-1" d="M44 31h2v16h-2z"/></g></g></svg>`,
  tank: `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 921.1348 1033.9253" enable-background="new 0 0 921.1348 1033.9253" xml:space="preserve">
<pattern  x="-819.4326" y="-283.5833" width="100" height="100" patternUnits="userSpaceOnUse" id="New_Pattern_Swatch_3" viewBox="0 -100 100 100" overflow="visible">
	<g>
		<polygon fill="none" points="0,0 100,0 100,-100 0,-100 		"/>
		<g>
			<polygon fill="none" points="55.9595,-100 0,-44.041 0,-37.7773 62.2222,-100 			"/>
			<polygon fill="none" points="46.8687,-100 0,-53.1309 0,-46.8691 53.1313,-100 			"/>
			<polygon fill="none" points="37.7778,-100 0,-62.2227 0,-55.959 44.0405,-100 			"/>
			<polygon fill="none" points="10.5049,-100 0,-89.4951 0,-83.2324 16.7676,-100 			"/>
			<polygon fill="none" points="1.4141,-100 0,-98.5859 0,-92.3232 7.6768,-100 			"/>
			<polygon fill="none" points="28.687,-100 0,-71.3125 0,-65.0508 34.9497,-100 			"/>
			<polygon fill="none" points="19.5957,-100 0,-80.4043 0,-74.1406 25.8589,-100 			"/>
			<polygon fill="none" points="92.3232,-100 0,-7.6768 0,-1.4141 98.5859,-100 			"/>
			<polygon fill="none" points="65.0503,-100 0,-34.9492 0,-28.6875 71.313,-100 			"/>
			<polygon fill="none" points="44.0405,0 100,-55.959 100,-62.2227 37.7778,0 			"/>
			<polygon fill="none" points="62.2222,0 100,-37.7773 100,-44.041 55.9595,0 			"/>
			<polygon fill="none" points="34.9497,0 100,-65.0508 100,-71.3125 28.687,0 			"/>
			<polygon fill="none" points="53.1313,0 100,-46.8691 100,-53.1309 46.8687,0 			"/>
			<polygon fill="none" points="100,-92.3232 100,-98.5859 1.4141,0 7.6768,0 			"/>
			<polygon fill="none" points="25.8589,0 100,-74.1406 100,-80.4043 19.5957,0 			"/>
			<polygon fill="none" points="16.7676,0 100,-83.2324 100,-89.4951 10.5049,0 			"/>
			<polygon fill="none" points="71.313,0 100,-28.6875 100,-34.9492 65.0503,0 			"/>
			<polygon fill="none" points="98.5859,0 100,-1.4141 100,-7.6768 92.3232,0 			"/>
			<polygon fill="none" points="80.4043,0 100,-19.5957 100,-25.8594 74.1411,0 			"/>
			<polygon fill="none" points="89.4951,0 100,-10.5049 100,-16.7676 83.2324,0 			"/>
			<polygon fill="none" points="83.2324,-100 0,-16.7676 0,-10.5049 89.4951,-100 			"/>
			<polygon fill="none" points="74.1411,-100 0,-25.8594 0,-19.5957 80.4043,-100 			"/>
			<polygon points="37.7778,0 100,-62.2227 100,-65.0508 34.9497,0 			"/>
			<polygon points="55.9595,0 100,-44.041 100,-46.8691 53.1313,0 			"/>
			<polygon points="53.1313,-100 0,-46.8691 0,-44.041 55.9595,-100 			"/>
			<polygon points="34.9497,-100 0,-65.0508 0,-62.2227 37.7778,-100 			"/>
			<polygon points="16.7676,-100 0,-83.2324 0,-80.4043 19.5957,-100 			"/>
			<polygon points="46.8687,0 100,-53.1309 100,-55.959 44.0405,0 			"/>
			<polygon points="25.8589,-100 0,-74.1406 0,-71.3125 28.687,-100 			"/>
			<polygon points="10.5049,0 100,-89.4951 100,-92.3232 7.6768,0 			"/>
			<polygon points="44.0405,-100 0,-55.959 0,-53.1309 46.8687,-100 			"/>
			<polygon points="28.687,0 100,-71.3125 100,-74.1406 25.8589,0 			"/>
			<polygon points="19.5957,0 100,-80.4043 100,-83.2324 16.7676,0 			"/>
			<polygon points="100,-100 98.5859,-100 0,-1.4141 0,0 1.4141,0 100,-98.5859 			"/>
			<polygon points="62.2222,-100 0,-37.7773 0,-34.9492 65.0503,-100 			"/>
			<polygon points="7.6768,-100 0,-92.3232 0,-89.4951 10.5049,-100 			"/>
			<polygon points="80.4043,-100 0,-19.5957 0,-16.7676 83.2324,-100 			"/>
			<polygon points="92.3232,0 100,-7.6768 100,-10.5049 89.4951,0 			"/>
			<polygon points="89.4951,-100 0,-10.5049 0,-7.6768 92.3232,-100 			"/>
			<polygon points="100,0 100,-1.4141 98.5859,0 			"/>
			<polygon points="74.1411,0 100,-25.8594 100,-28.6875 71.313,0 			"/>
			<polygon points="65.0503,0 100,-34.9492 100,-37.7773 62.2222,0 			"/>
			<polygon points="71.313,-100 0,-28.6875 0,-25.8594 74.1411,-100 			"/>
			<polygon points="83.2324,0 100,-16.7676 100,-19.5957 80.4043,0 			"/>
			<polygon points="0,-100 0,-98.5859 1.4141,-100 			"/>
		</g>
		<g>
			<polygon fill="none" points="44.0405,-100 100,-44.041 100,-37.7773 37.7778,-100 			"/>
			<polygon fill="none" points="53.1313,-100 100,-53.1309 100,-46.8691 46.8687,-100 			"/>
			<polygon fill="none" points="62.2222,-100 100,-62.2227 100,-55.959 55.9595,-100 			"/>
			<polygon fill="none" points="89.4951,-100 100,-89.4951 100,-83.2324 83.2324,-100 			"/>
			<polygon fill="none" points="98.5859,-100 100,-98.5859 100,-92.3232 92.3232,-100 			"/>
			<polygon fill="none" points="71.313,-100 100,-71.3125 100,-65.0508 65.0503,-100 			"/>
			<polygon fill="none" points="80.4043,-100 100,-80.4043 100,-74.1406 74.1411,-100 			"/>
			<polygon fill="none" points="7.6768,-100 100,-7.6768 100,-1.4141 1.4141,-100 			"/>
			<polygon fill="none" points="34.9497,-100 100,-34.9492 100,-28.6875 28.687,-100 			"/>
			<polygon fill="none" points="55.9595,0 0,-55.959 0,-62.2227 62.2222,0 			"/>
			<polygon fill="none" points="37.7778,0 0,-37.7773 0,-44.041 44.0405,0 			"/>
			<polygon fill="none" points="65.0503,0 0,-65.0508 0,-71.3125 71.313,0 			"/>
			<polygon fill="none" points="46.8687,0 0,-46.8691 0,-53.1309 53.1313,0 			"/>
			<polygon fill="none" points="0,-92.3232 0,-98.5859 98.5859,0 92.3232,0 			"/>
			<polygon fill="none" points="74.1411,0 0,-74.1406 0,-80.4043 80.4043,0 			"/>
			<polygon fill="none" points="83.2324,0 0,-83.2324 0,-89.4951 89.4951,0 			"/>
			<polygon fill="none" points="28.687,0 0,-28.6875 0,-34.9492 34.9497,0 			"/>
			<polygon fill="none" points="1.4141,0 0,-1.4141 0,-7.6768 7.6768,0 			"/>
			<polygon fill="none" points="19.5957,0 0,-19.5957 0,-25.8594 25.8589,0 			"/>
			<polygon fill="none" points="10.5049,0 0,-10.5049 0,-16.7676 16.7676,0 			"/>
			<polygon fill="none" points="16.7676,-100 100,-16.7676 100,-10.5049 10.5049,-100 			"/>
			<polygon fill="none" points="25.8589,-100 100,-25.8594 100,-19.5957 19.5957,-100 			"/>
			<polygon points="62.2222,0 0,-62.2227 0,-65.0508 65.0503,0 			"/>
			<polygon points="44.0405,0 0,-44.041 0,-46.8691 46.8687,0 			"/>
			<polygon points="46.8687,-100 100,-46.8691 100,-44.041 44.0405,-100 			"/>
			<polygon points="65.0503,-100 100,-65.0508 100,-62.2227 62.2222,-100 			"/>
			<polygon points="83.2324,-100 100,-83.2324 100,-80.4043 80.4043,-100 			"/>
			<polygon points="53.1313,0 0,-53.1309 0,-55.959 55.9595,0 			"/>
			<polygon points="74.1411,-100 100,-74.1406 100,-71.3125 71.313,-100 			"/>
			<polygon points="89.4951,0 0,-89.4951 0,-92.3232 92.3232,0 			"/>
			<polygon points="55.9595,-100 100,-55.959 100,-53.1309 53.1313,-100 			"/>
			<polygon points="71.313,0 0,-71.3125 0,-74.1406 74.1411,0 			"/>
			<polygon points="80.4043,0 0,-80.4043 0,-83.2324 83.2324,0 			"/>
			<polygon points="0,-100 1.4141,-100 100,-1.4141 100,0 98.5859,0 0,-98.5859 			"/>
			<polygon points="37.7778,-100 100,-37.7773 100,-34.9492 34.9497,-100 			"/>
			<polygon points="92.3232,-100 100,-92.3232 100,-89.4951 89.4951,-100 			"/>
			<polygon points="19.5957,-100 100,-19.5957 100,-16.7676 16.7676,-100 			"/>
			<polygon points="7.6768,0 0,-7.6768 0,-10.5049 10.5049,0 			"/>
			<polygon points="10.5049,-100 100,-10.5049 100,-7.6768 7.6768,-100 			"/>
			<polygon points="0,0 0,-1.4141 1.4141,0 			"/>
			<polygon points="25.8589,0 0,-25.8594 0,-28.6875 28.687,0 			"/>
			<polygon points="34.9497,0 0,-34.9492 0,-37.7773 37.7778,0 			"/>
			<polygon points="28.687,-100 100,-28.6875 100,-25.8594 25.8589,-100 			"/>
			<polygon points="16.7676,0 0,-16.7676 0,-19.5957 19.5957,0 			"/>
			<polygon points="100,-100 100,-98.5859 98.5859,-100 			"/>
		</g>
	</g>
</pattern>
<g>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="806.0674" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="752.7341" cy="169.25" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="694.3177" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="577.5674" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="463.3874" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="350.234" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="233.2176" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="116.2011" cy="112.5833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="58.9759" cy="169.8086" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="173.1504" cy="169.8086" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="296.3249" cy="168.8086" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="401.4994" cy="169.8086" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="634.8484" cy="169.8086" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="820.6398" cy="234.3446" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="765.5674" cy="295.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="826.0674" cy="358.6621" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="696.3177" cy="234.3446" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="226.029" cy="234.3446" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="168.552" cy="285.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="406.9008" cy="286.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="344.9008" cy="350.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="282.9008" cy="414.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="220.9008" cy="478.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="168.9007" cy="527.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="518.2341" cy="295.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="528.2341" cy="392.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="594.9008" cy="458.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="654.2341" cy="518.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="713.5674" cy="580.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="573.5674" cy="345.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="644.2341" cy="414.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="700.2341" cy="472.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="761.5674" cy="530.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="460.234" cy="334.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="396.4141" cy="397.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="332.5943" cy="460.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="273.4409" cy="521.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="212.2878" cy="578.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="159.8011" cy="632.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="229.1344" cy="706.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="287.5674" cy="650.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="346.0004" cy="595.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="404.4334" cy="540.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="518.9008" cy="540.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="464.9008" cy="585.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="524.9008" cy="644.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="515.5674" cy="776.7501" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="458.9008" cy="831.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="460.234" cy="937.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="403.5674" cy="881.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="517.5674" cy="886.7501" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="353.5674" cy="832.0833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="407.5674" cy="779.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="573.5674" cy="830.0833" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="584.9008" cy="702.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="644.9008" cy="761.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="397.5674" cy="649.4167" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="346.9008" cy="702.75" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="283.5674" cy="762.7501" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="576.2341" cy="594.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="633.5674" cy="648.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="690.9008" cy="702.0834" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="102.4637" cy="348.6621" r="10"/>
	<circle fill="none" stroke="#000000" stroke-width="5" stroke-miterlimit="10" cx="112.7069" cy="234.3446" r="10"/>
</g>
<path fill="none" stroke="#000000" stroke-width="13" stroke-miterlimit="10" d="M48.3584,44.6903h824.9588
	c18.4561,187.6575,2.5706,367.2615-55.4973,536.9731c-78.2987,185.7018-204.6151,312.1609-356.9821,406.4797
	C299.576,893.2449,178.1622,767.3047,108.3554,601.1624C45.9483,407.2831,28.3946,222.276,48.3584,44.6903z"/>
<g>
	<polygon fill="url(#New_Pattern_Swatch_3)" points="619.2837,868.1951 464.351,713.2624 303.9941,873.6193 243.8009,813.4261 
		463.9707,593.2563 683.6924,800.9647 	"/>
	<polygon fill="url(#New_Pattern_Swatch_3)" points="733.7275,736.318 459.856,474.0316 183.7337,737.5427 140.0258,666.4438 
		463.9707,343.2563 784.2352,653.3013 	"/>
	<polygon fill="url(#New_Pattern_Swatch_3)" points="819.4008,579.0897 461.1508,224.1843 103.047,582.2881 78.9841,494.423 
		463.9707,109.2141 846.1508,484.5897 	"/>
</g>
<path fill="none" stroke="#000000" stroke-miterlimit="10" d="M683.1091,801.125"/>
</svg>
`,
  ricochet: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 50 62.5" enable-background="new 0 0 50 50" xml:space="preserve"><g><g><path fill="#000000" d="M25.345,41.312c-8.388-0.274-15.896-1.79-21.111-3.988c1.661,6.666,11.409,11.199,22.754,10.305    c8.373-0.662,15.42-4.107,18.777-8.617C40.484,40.673,33.27,41.57,25.345,41.312z"/></g><path fill="#000000" d="M38.504,42.731l1.645,5.008c0,0,2.064-3.797,2.09-6.947C38.504,42.731,38.504,42.731,38.504,42.731z"/><polygon fill="#000000" points="37.059,4.091 37.059,43.846 36.016,43.846  "/><path fill="#000000" d="M36.283,2.259c0,0-13.594,9.99-22.984,33.234c0,0,12.421-6.277,22.386,0L36.283,2.259z"/><g><path fill="#000000" d="M36.754,39.894l-18.786-4.4l-1.819,4.617c2.434,0.317,4.999,0.529,7.654,0.616    C29.418,40.91,32.285,40.733,36.754,39.894z"/></g><path fill="#000000" d="M19.291,39.377c-1.15,0.048-2.018-0.198-2.018-0.198l1.016-2.855c0,0,1.375,0.369,1.925,0.525   C19.991,37.853,19.778,38.507,19.291,39.377z"/></g><text x="0" y="65" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by Mister Pixel</text><text x="0" y="70" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`,
  semiRicochet: `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 926.24205 1157.028775" version="1.1" x="0px" y="0px"><g transform="translate(2755.6029,351.20791)"><path style="" d="m -2699.9859,518.78758 -55.617,-55.62751 407.184,-407.183984 407.184,-407.183996 55.937,55.937 55.9371,55.937 -406.8731,406.87451 c -223.7802,223.78096 -407.157,406.87449 -407.504,406.87449 -0.3471,0 -25.6586,-25.03238 -56.248,-55.62751 z" fill="#000000"/></g><text x="0" y="940.62302" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">Created by iconeu</text><text x="0" y="945.62302" fill="#000000" font-size="5px" font-weight="bold" font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif">from the Noun Project</text></svg>`,
  cannon: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="83.79435mm"
   height="122.94003mm"
   viewBox="0 0 296.90911 435.61426"
   id="svg2"
   version="1.1"
   inkscape:version="0.91 r13725"
   sodipodi:docname="fighter_jet_top_view.svg">
  <defs
     id="defs4" />
  <sodipodi:namedview
     id="base"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:pageopacity="0.0"
     inkscape:pageshadow="2"
     inkscape:zoom="1.8640344"
     inkscape:cx="148.45456"
     inkscape:cy="217.80715"
     inkscape:document-units="px"
     inkscape:current-layer="layer1"
     showgrid="false"
     inkscape:window-width="1920"
     inkscape:window-height="1005"
     inkscape:window-x="-9"
     inkscape:window-y="-9"
     inkscape:window-maximized="1"
     fit-margin-top="0"
     fit-margin-left="0"
     fit-margin-right="0"
     fit-margin-bottom="0" />
  <metadata
     id="metadata7">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1"
     transform="translate(-158.30047,-349.88541)">
    <path
       style="fill:#000000"
       d="m 215.40015,778.35346 c -5.01228,-8.33179 -5.89904,-11.6479 -4.03986,-15.1074 1.73684,-3.23186 34.12746,-43.62826 35.03593,-43.69553 0.37765,-0.028 0.82765,1.29887 1,2.94852 l 0.31336,2.99937 6.25,-5.57925 6.25,-5.57925 0,-10.92012 0,-10.92012 -21.03843,0 c -19.69083,0 -22.2781,0.22419 -40.39211,3.5 -10.64452,1.925 -20.20107,3.5 -21.23674,3.5 -1.29845,0 -4.60677,-4.04229 -10.65639,-13.02057 -8.38117,-12.43856 -8.76313,-13.24415 -8.54512,-18.02212 0.22776,-4.99137 0.25276,-5.02537 12.2985,-16.72471 6.63865,-6.44774 23.43279,-22.96356 37.32029,-36.70181 l 25.25,-24.97864 0,-6.77608 c 0,-5.35651 -0.31425,-6.77607 -1.5,-6.77607 -1.75686,0 -2.00232,-3.09768 -0.37446,-4.72554 0.61905,-0.61905 1.46255,-4.56756 1.87446,-8.77446 0.85088,-8.69025 2.34198,-11.36093 3.96284,-7.09774 0.57044,1.50037 1.03993,4.83614 1.04332,7.41284 0.003,2.57669 0.67839,5.97384 1.5,7.54921 1.64969,3.16313 1.94233,5.63569 0.66703,5.63569 -0.45474,0 -0.62369,1.38394 -0.37543,3.07543 0.64337,4.38356 2.02701,2.31558 2.39224,-3.57543 0.34693,-5.59572 2.13885,-6.77747 2.62477,-1.73102 0.34205,3.55224 2.15767,3.48871 2.22912,-0.078 0.0241,-1.20504 0.64612,-3.87848 1.38216,-5.94098 1.24159,-3.47909 1.2023,-3.75 -0.54389,-3.75 -1.03519,0 -1.88216,-0.675 -1.88216,-1.5 0,-0.825 0.37777,-1.5 0.83948,-1.5 1.55776,0 3.16052,-5.06205 3.16052,-9.98195 0,-2.68832 0.46672,-6.11542 1.03716,-7.61579 1.69757,-4.46494 3.23758,-1.36966 3.75361,7.54438 0.29424,5.08279 0.96694,8.43732 1.83675,9.1592 1.82756,1.51673 1.74971,3.89416 -0.12752,3.89416 -0.825,0 -1.5,0.75919 -1.5,1.68709 0,1.33631 0.59623,1.11586 2.86756,-1.06021 2.69003,-2.5772 2.91159,-3.40915 3.57855,-13.43709 1.79264,-11.19975 4.20994,-29.27479 7.48098,-38.00441 1.5566,-3.78459 2.00961,-7.8793 2.35626,-21.29828 0.23603,-9.1371 0.7454,-17.1246 1.13192,-17.75 0.44021,-0.71228 4.04312,-1.1371 9.64375,-1.1371 l 8.94098,0 0,-17.63976 0,-36.73491 c 0,-12.0106 0.55624,-19.64973 2.0871,-28.66316 3.14335,-18.50742 10.55453,-41.91972 12.82545,-40.51622 1.4724,0.91 7.90415,21.14732 10.69331,33.64622 2.08912,9.36183 2.64405,15.02457 3.09408,31.57367 l 0.30006,40.40371 0,17.93045 9.32825,0 9.32825,0 c 2.02496,7.64752 2.32429,11.01186 2.3435,17.91974 0,10.31007 0.39627,18.9039 2.05902,23.67371 2.85868,8.20045 5.68008,21.97268 7.04859,34.40655 0.71496,6.49595 1.73412,11.16464 2.67259,12.24291 1.42115,1.63285 1.66542,1.54165 3.86837,-1.44428 1.8447,-2.50035 2.35907,-4.49219 2.38687,-9.24291 0.0195,-3.33065 0.6275,-7.12368 1.35114,-8.42896 l 1.3157,-2.37324 0.63521,2.37324 c 0.34936,1.30528 0.64135,5.12505 0.64886,8.48838 0.0102,4.58627 0.51368,6.75083 2.01365,8.65773 2.50437,3.18379 2.54284,4.72713 0.11784,4.72713 -1.71164,0 -1.77373,0.3154 -0.68534,3.48133 0.65825,1.91473 1.50523,3.78973 1.88216,4.16667 0.37694,0.37693 0.72592,1.62283 0.77553,2.76867 0.0609,1.40751 0.3976,1.01748 1.03783,-1.20231 1.26544,-4.38751 2.87198,-3.14444 2.87198,2.22221 0,5.40307 2.5284,8.23003 3.20961,3.58861 0.30381,-2.06997 0.0251,-3.02518 -0.8828,-3.02518 -1.787,0 -1.68305,-2.78661 0.17319,-4.64286 0.99224,-0.99224 1.5,-3.48483 1.5,-7.36347 0,-6.94051 1.52381,-11.86986 3.1627,-10.23097 0.59861,0.59861 1.43001,4.57749 1.84755,8.84195 0.51997,5.31062 1.2681,8.12572 2.37446,8.9347 2.2855,1.6712 2.04493,4.46065 -0.38471,4.46065 -1.78746,0 -2,0.66667 -2,6.27341 l 0,6.27342 28.24999,27.99175 c 15.5375,15.39546 32.4125,31.97913 37.5,36.85259 l 9.25,8.86084 0,5.32904 c 0,4.99346 -0.49947,6.07627 -7.93148,17.19469 -4.36231,6.5261 -8.59463,12.416 -9.40514,13.08867 -1.18002,0.97932 -5.52647,0.41727 -21.81265,-2.82069 -19.91902,-3.96022 -20.77788,-4.04372 -41.59485,-4.04372 l -21.25587,0 0,11.32242 0,11.32242 6.5,5.74216 6.5,5.74215 0,-3.14791 c 0,-1.73135 0.40247,-2.99791 0.89437,-2.81457 0.49191,0.18333 8.63356,9.97815 18.09256,21.76627 11.56071,14.40735 17.35447,22.43831 17.67499,24.5 0.36204,2.32881 -0.44253,4.5686 -3.34256,9.30518 -5.51565,9.00861 -6.81431,10.26669 -10.55958,10.22958 -1.79289,-0.0178 -11.44861,-1.75959 -21.45717,-3.87072 -18.09326,-3.81644 -18.19912,-3.82627 -18.5,-1.71769 -0.20803,1.45792 -2.5918,-2.09848 -7.62724,-11.37929 -7.81558,-14.40488 -9.17537,-16.43522 -9.17537,-13.7 0,1.47256 -1.18978,1.7 -8.89301,1.7 -9.85131,0 -9.49716,0.24943 -10.66053,-7.50843 -0.8164,-5.44416 -1.8407,-4.46422 -2.88332,2.75843 -0.59798,4.14244 -0.98978,4.75 -3.06314,4.75 -2.07336,0 -2.46516,-0.60756 -3.06314,-4.75 -1.04262,-7.22265 -2.06692,-8.20259 -2.88332,-2.75843 -1.1627,7.75338 -0.81731,7.50843 -10.5872,7.50843 -7.60301,0 -8.86678,-0.24141 -9.16103,-1.75 -0.20143,-1.03269 -3.60572,4.19346 -8.30531,12.75 -4.69959,8.55654 -8.10388,13.78269 -8.30531,12.75 -0.18773,-0.9625 -0.7913,-1.75 -1.34125,-1.75 -0.54995,0 -8.64673,1.575 -17.99285,3.5 -9.34611,1.925 -18.87799,3.5 -21.18195,3.5 -4.12683,0 -4.25282,-0.10607 -8.48807,-7.14622 z M 359.20958,565.99968 c 0,-0.825 -0.7301,-1.5 -1.62244,-1.5 -1.3288,0 -1.39713,0.27149 -0.37756,1.5 0.68469,0.825 1.41479,1.5 1.62244,1.5 0.20766,0 0.37756,-0.675 0.37756,-1.5 z"
       id="path4147"
       inkscape:connector-curvature="0"
       sodipodi:nodetypes="sscscccccssssssscssssscssssscsssssssssssccssscccsssccccccsssssscsssssccssssssssssscsscssssscccccscssscsssssssssssssssssssssss" />
  </g>
</svg>
`,
};

export function addClasses() {
  document.getElementById("ricochet-P1").classList.add("right");
  document.getElementById("semiRicochet-P1").classList.add("right");
  document.getElementById("ricochet-P2").classList.add("left");
  document.getElementById("semiRicochet-P2").classList.add("left");
}

export function addPieces(game) {
  //Adding pieces for player 1
  game.addPiece("titan-P1", "brown", positionP1.titan);
  game.addPiece("tank-P1", "brown", positionP1.tank);
  game.addPiece("ricochet-P1", "brown", positionP1.ricochet);
  game.addPiece("semiRicochet-P1", "brown", positionP1.semiRicochet);
  game.addPiece("cannon-P1", "brown", positionP1.cannon);

  //Adding pieces for player 2
  game.addPiece("titan-P2", "#005ed8", positionP2.titan);
  game.addPiece("tank-P2", "#005ed8", positionP2.tank);
  game.addPiece("ricochet-P2", "#005ed8", positionP2.ricochet);
  game.addPiece("semiRicochet-P2", "#005ed8", positionP2.semiRicochet);
  game.addPiece("cannon-P2", "#005ed8", positionP2.cannon);

  const piece = document.getElementById("ricochet-P1");
  piece.style.transform = "scaleY(-1) scaleX(-1)";
}

export function giveDir(diff) {
  if (diff == 1) {
    return "Left";
  } else if (diff == 8) {
    return "Up";
  } else if (diff == -8) {
    return "Down";
  } else if (diff == -1) {
    return "Right";
  } else if (diff == 9) {
    return "UpLeft";
  } else if (diff == -9) {
    return "DownRight";
  } else if (diff == 7) {
    return "UpRight";
  } else if (diff == -7) {
    return "DownLeft";
  }
}

export function location() {
  let newPositionP1, newPositionP2;
  do {
    newPositionP1 = generatePositionsP1();
    newPositionP2 = generatePositionsP2();
  } while (!checkConditions(newPositionP1, newPositionP2));

  // Update the exported variables
  Object.assign(positionP1, newPositionP1);
  Object.assign(positionP2, newPositionP2);
}

// Generate random positions for player 1
function generatePositionsP1() {
  return {
    titan: getRandomInt(1, 8),
    tank: getRandomInt(9, 16),
    ricochet: getRandomInt(1, 16),
    semiRicochet: getRandomInt(1, 16),
    cannon: getRandomInt(1, 8),
  };
}

// Generate random positions for player 2
function generatePositionsP2() {
  return {
    titan: getRandomInt(57, 64),
    tank: getRandomInt(49, 56),
    ricochet: getRandomInt(49, 64),
    semiRicochet: getRandomInt(49, 64),
    cannon: getRandomInt(57, 64),
  };
}

// Check conditions for valid positions
function checkConditions(positionsP1, positionsP2) {
  return (
    positionsP1.titan + 56 !== positionsP2.cannon &&
    positionsP2.titan - 56 !== positionsP1.cannon &&
    positionsP1.cannon + 8 !== positionsP1.ricochet &&
    positionsP2.cannon + 8 !== positionsP2.ricochet &&
    positionsP2.titan !== positionsP2.cannon &&
    positionsP2.titan !== positionsP2.ricochet &&
    positionsP2.titan !== positionsP2.semiRicochet &&
    positionsP2.titan !== positionsP2.tank &&
    positionsP2.cannon !== positionsP2.ricochet &&
    positionsP2.cannon !== positionsP2.semiRicochet &&
    positionsP2.ricochet !== positionsP2.semiRicochet &&
    positionsP2.tank !== positionsP2.ricochet &&
    positionsP2.tank !== positionsP2.semiRicochet &&
    positionsP1.titan !== positionsP1.cannon &&
    positionsP1.titan !== positionsP1.ricochet &&
    positionsP1.titan !== positionsP1.semiRicochet &&
    positionsP1.titan !== positionsP1.tank &&
    positionsP1.cannon !== positionsP1.ricochet &&
    positionsP1.cannon !== positionsP1.semiRicochet &&
    positionsP1.ricochet !== positionsP1.semiRicochet &&
    positionsP1.tank !== positionsP1.ricochet &&
    positionsP1.tank !== positionsP1.semiRicochet
  );
}

// Utility function to get a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isCannonBallPresent(board){
	return board.querySelector(".cannonball")!==null;
}