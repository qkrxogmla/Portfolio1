const themeToggleButton = document.getElementById("themeToggle");
const githubCard = document.getElementById("githubCard");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggleButton.textContent = "라이트모드";
  } else {
    themeToggleButton.textContent = "다크모드";
  }
});

async function loadGithubInfo() {
  try {
    const response = await fetch("https://api.github.com/users/qkrxogmla");

    if (!response.ok) {
      throw new Error("GitHub 정보를 불러오지 못했습니다.");
    }

    const data = await response.json();

    githubCard.innerHTML = `
      <div class="github-profile">
        <img src="${data.avatar_url}" alt="GitHub 프로필 이미지" />
        <div>
          <h3>${data.name || data.login}</h3>
          <p>${data.bio || "GitHub 프로필 소개가 없습니다."}</p>
          <p>
            <a href="${data.html_url}" target="_blank">
              GitHub 프로필 바로가기
            </a>
          </p>
        </div>
      </div>

      <div class="github-stats">
        <div>
          <strong>${data.public_repos}</strong>
          Repositories
        </div>
        <div>
          <strong>${data.followers}</strong>
          Followers
        </div>
        <div>
          <strong>${data.following}</strong>
          Following
        </div>
      </div>
    `;
  } catch (error) {
    githubCard.innerHTML = `
      <p>GitHub 정보를 불러오는 데 실패했습니다.</p>
    `;
    console.error(error);
  }
}

loadGithubInfo();
