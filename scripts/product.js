document.querySelectorAll('.tab-btn').forEach((tab) => {
    tab.addEventListener('click', () => {
        // 모든 탭의 선택 상태 해제
        document.querySelectorAll('.tab-btn').forEach((t) => t.setAttribute('aria-selected', 'false'));
        // 클릭된 탭의 선택 상태 설정
        tab.setAttribute('aria-selected', 'true');
    });
});
