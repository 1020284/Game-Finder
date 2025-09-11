const gameDatabase = {
  "Run 3": [
    "https://example1.com/run3",
    "https://example2.com/run3",
    "https://example3.com/run3"
  ],
  "Slope": [
    "https://example1.com/slope",
    "https://example2.com/slope",
    "https://example3.com/slope"
  ]
};

function findGame() {
  const gameName = document.getElementById("gameInput").value.trim();
  const urls = gameDatabase[gameName];
  const status = document.getElementById("status");
  const result = document.getElementById("result");
  const frame = document.getElementById("testFrame");

  result.innerHTML = "";
  status.innerText = "Searching...";

  if (!urls) {
    status.innerText = "Game not found in database.";
    return;
  }

  let index = 0;

  function testNext() {
    if (index >= urls.length) {
      status.innerText = "All versions appear to be blocked.";
      return;
    }

    const url = urls[index];
    frame.src = url;

    let loaded = false;

    const timeout = setTimeout(() => {
      if (!loaded) {
        index++;
        testNext();
      }
    }, 3000); // 3 seconds to load

    frame.onload = () => {
      loaded = true;
      clearTimeout(timeout);
      status.innerText = "✅ Found unblocked version!";
      result.innerHTML = `<a href="${url}" target="_blank">${gameName} → Play Now</a>`;
    };

    frame.onerror = () => {
      index++;
      testNext();
    };
  }

  testNext();
}
