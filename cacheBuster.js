async function checkSiteVersion() {
  try {
    // Step 1: Server se latest version.json fetch karo (cache bypass)
    const response = await fetch('/version.json', { cache: 'no-store' });
    const data = await response.json();
    const latestVersion = data.version;

    // Step 2: LocalStorage me current version check karo
    const currentVersion = localStorage.getItem('site-version');

    // Step 3: Agar version mismatch ho to force refresh
    if (currentVersion && currentVersion !== latestVersion) {
      console.log("🔄 New version detected. Refreshing site...");
      localStorage.setItem('site-version', latestVersion);
      window.location.reload(true); // Force reload
    } else if (!currentVersion) {
      // First time visit par version set karo
      localStorage.setItem('site-version', latestVersion);
    }
  } catch (error) {
    console.error("❌ Version check failed:", error);
  }
}

// Run function jab page load ho
checkSiteVersion();
