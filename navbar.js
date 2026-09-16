// DanKimComposer - Navbar Dropdown Navigation Script
(function () {
    function initNavbar() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            if (!toggle || !menu) return;

            // Prevent double-initialization
            if (toggle.dataset.dropdownInit) return;
            toggle.dataset.dropdownInit = 'true';

            toggle.setAttribute('role', 'button');
            toggle.setAttribute('aria-haspopup', 'true');
            toggle.setAttribute('aria-expanded', 'false');

            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                const willOpen = !dropdown.classList.contains('open');

                // Close any other open dropdowns first
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('open');
                        const otherToggle = other.querySelector('.nav-link');
                        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                if (willOpen) {
                    dropdown.classList.add('open');
                    toggle.setAttribute('aria-expanded', 'true');
                } else {
                    dropdown.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close dropdown when clicking anywhere outside
        document.addEventListener('click', function (e) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                    const toggle = dropdown.querySelector('.nav-link');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                    const toggle = dropdown.querySelector('.nav-link');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
