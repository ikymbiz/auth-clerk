// Clerkの公開キー
const clerkPubKey = 'pk_test_Y2xlYW4tdGFycG9uLTkxLmNsZXJrLmFjY291bnRzLmRldiQ';

const startClerk = async () => {
    const Clerk = window.Clerk;
    const appDiv = document.getElementById('app');
    const protectedContent = document.getElementById('protected-content');
    const userInfo = document.getElementById('user-info');

    try {
        // Clerkを起動
        await Clerk.load();

        if (Clerk.user) {
            appDiv.innerHTML = `<div id="user-button"></div>`;
            Clerk.mountUserButton(document.getElementById('user-button'));
            userInfo.innerText = `ようこそ、${Clerk.user.primaryEmailAddress.emailAddress} さん`;
            protectedContent.classList.remove('hidden');
        } else {
            appDiv.innerHTML = `
                <h2 style="text-align: center;">ログインしてね</h2>
                <div id="sign-in"></div>
            `;
            Clerk.mountSignIn(document.getElementById('sign-in'));
        }
    } catch (err) {
        console.error('Clerkのエラー:', err);
        appDiv.innerHTML = `
            <p style="font-weight: bold; color: red;">エラーが発生しました。</p>
            <p class="error-text">詳細: ${err.message || err}</p>
        `;
    }
};

// Clerkのシステムを読み込む処理
const script = document.createElement('script');
script.setAttribute('data-clerk-publishable-key', clerkPubKey);
script.async = true;
script.src = `https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;
script.crossOrigin = 'anonymous';
script.addEventListener('load', startClerk);

script.addEventListener('error', () => {
    document.getElementById('app').innerHTML = `
        <p style="font-weight: bold; color: red;">システムの読み込みに失敗しました。</p>
    `;
});

document.body.appendChild(script);
