/**
* 랜덤 띵언을 제공하는 API URL
* @constant {string}
*/
const DDING_API_URL = "https://korean-advice-open-api.vercel.app/api/advice";

/**
* API에서 랜덤 띵언을 가져와 HTML을 업데이트하는 함수
* @function
*/
function randomDding() {
    (async function () {
        try {
            // API 호출하여 응답을 JSON 형식으로 파싱
            let res = await fetch(DDING_API_URL).then(response => response.json());
            console.log(res);
            // 메시지 태그
            let $message = document.getElementById('dding_message');
            // 위인명 태그
            let $author = document.getElementById('dding_author');
            // 위인 프로필 태그
            let $authorProfile = document.getElementById('dding_authorProfile');

            $message.innerHTML = `" ${res.message} "`;
            $author.innerHTML = `<span>-</span> ${res.author}`;
            // 위인 프로필 값이 있을때만 출력
            if (res.authorProfile) {
                $authorProfile.innerHTML = `(${res.authorProfile})`;
                $authorProfile.removeAttribute("hidden");
            } else {
                $authorProfile.setAttribute("hidden", true);
            }
        } catch (err) {
            console.error(err);
        }
    })();
}

document.addEventListener("DOMContentLoaded", function () {
    // 띵언 영역 태그
    let $dding_area = document.getElementById('dding_area');

    $dding_area.innerHTML = `
        <div id="dding_title">오늘의 명언</div>
        <div>
            <div id="dding_message"></div>
            <span id="dding_author"></span>
            <span id="dding_authorProfile"></span>
        </div>
        <svg id="dding_btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z"></path>
        </svg>
    `;

    // 함수 호출
    randomDding();
    document.getElementById('dding_btn').addEventListener("click", randomDding);
});