// 每日展示页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 点赞功能
    const likeButtons = document.querySelectorAll('.like-btn:not(:disabled)');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (this.classList.contains('active')) {
                // 取消点赞
                this.classList.remove('active');
                count--;
                icon.style.animation = 'none';
            } else {
                // 点赞
                this.classList.add('active');
                count++;
                icon.style.animation = 'heartBeat 0.6s ease-in-out';
            }
            
            countSpan.textContent = count;
            
            // 重置动画
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        });
    });
    
    // 查看作品详情
    const viewWorkButtons = document.querySelectorAll('.view-work:not(:disabled)');
    
    viewWorkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const workItem = this.closest('.work-item');
            const studentName = workItem.querySelector('.student-details h3').textContent;
            const workTitle = workItem.querySelector('.work-description h4').textContent;
            const workDescription = workItem.querySelector('.work-description p').textContent;
            
            showWorkDetailModal(studentName, workTitle, workDescription);
        });
    });
    
    // 显示作品详情模态框
    function showWorkDetailModal(studentName, title, description) {
        const modal = document.createElement('div');
        modal.className = 'work-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${studentName} - ${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="work-detail-content">
                        <div class="work-description">
                            <h4>作品描述</h4>
                            <p>${description}</p>
                        </div>
                        <div class="work-gallery">
                            <h4>作品展示</h4>
                            <div class="gallery-grid">
                                <div class="gallery-item">
                                    <div class="gallery-preview" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                                        <i class="fas fa-image"></i>
                                        <span>设计稿</span>
                                    </div>
                                </div>
                                <div class="gallery-item">
                                    <div class="gallery-preview" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                                        <i class="fas fa-palette"></i>
                                        <span>色彩方案</span>
                                    </div>
                                </div>
                                <div class="gallery-item">
                                    <div class="gallery-preview" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                                        <i class="fas fa-file-alt"></i>
                                        <span>设计说明</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="work-feedback">
                            <h4>学习心得</h4>
                            <p>通过今天的学习，我深入理解了${title}的核心概念。在实践中遇到了一些挑战，但通过不断尝试和调整，最终完成了满意的作品。这次经历让我对设计有了更深的认识。</p>
                        </div>
                        <div class="work-tags">
                            <span class="tag">设计理论</span>
                            <span class="tag">实践练习</span>
                            <span class="tag">创意设计</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加模态框样式
        const style = document.createElement('style');
        style.textContent = `
            .work-detail-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .work-detail-modal.active {
                opacity: 1;
            }
            
            .work-detail-modal .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .work-detail-modal.active .modal-content {
                transform: scale(1);
            }
            
            .work-detail-modal .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .work-detail-modal .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #636e72;
            }
            
            .work-detail-modal .modal-body {
                padding: 1.5rem;
            }
            
            .work-detail-content h4 {
                color: #2d3436;
                margin-bottom: 1rem;
                font-size: 1.125rem;
            }
            
            .work-description {
                margin-bottom: 2rem;
            }
            
            .work-description p {
                color: #636e72;
                line-height: 1.6;
            }
            
            .work-gallery {
                margin-bottom: 2rem;
            }
            
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }
            
            .gallery-item {
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .gallery-item:hover {
                transform: translateY(-5px);
            }
            
            .gallery-preview {
                height: 120px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                position: relative;
                overflow: hidden;
            }
            
            .gallery-preview::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
            }
            
            .gallery-preview i {
                font-size: 2rem;
                margin-bottom: 0.5rem;
                position: relative;
                z-index: 1;
            }
            
            .gallery-preview span {
                position: relative;
                z-index: 1;
                font-size: 0.875rem;
            }
            
            .work-feedback {
                margin-bottom: 2rem;
            }
            
            .work-feedback p {
                color: #636e72;
                line-height: 1.6;
                font-style: italic;
            }
            
            .work-tags {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            
            .tag {
                padding: 0.25rem 0.75rem;
                background: #e9ecef;
                color: #636e72;
                border-radius: 15px;
                font-size: 0.75rem;
                font-weight: 500;
            }
            
            @media (max-width: 768px) {
                .work-detail-modal .modal-content {
                    width: 95%;
                    max-height: 95vh;
                }
                
                .gallery-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(style);
        
        // 显示模态框
        setTimeout(() => modal.classList.add('active'), 10);
        
        // 关闭模态框
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }, 300);
            }
        });
        
        // 图片预览功能
        const galleryItems = modal.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const preview = this.querySelector('.gallery-preview');
                const icon = preview.querySelector('i').className;
                const text = preview.querySelector('span').textContent;
                
                showImagePreview(icon, text);
            });
        });
    }
    
    // 图片预览功能
    function showImagePreview(iconClass, title) {
        const preview = document.createElement('div');
        preview.className = 'image-preview-modal';
        preview.innerHTML = `
            <div class="preview-content">
                <div class="preview-header">
                    <h3>${title}</h3>
                    <button class="preview-close">&times;</button>
                </div>
                <div class="preview-body">
                    <div class="preview-placeholder">
                        <i class="${iconClass}"></i>
                        <p>作品预览</p>
                        <span>点击查看大图</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(preview);
        
        // 添加预览样式
        const style = document.createElement('style');
        style.textContent = `
            .image-preview-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .image-preview-modal.active {
                opacity: 1;
            }
            
            .preview-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow: hidden;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .image-preview-modal.active .preview-content {
                transform: scale(1);
            }
            
            .preview-header {
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .preview-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #636e72;
            }
            
            .preview-body {
                padding: 2rem;
                text-align: center;
            }
            
            .preview-placeholder {
                padding: 3rem;
                background: #f8f9fa;
                border-radius: 8px;
                border: 2px dashed #dee2e6;
            }
            
            .preview-placeholder i {
                font-size: 4rem;
                color: #adb5bd;
                margin-bottom: 1rem;
                display: block;
            }
            
            .preview-placeholder p {
                font-size: 1.25rem;
                color: #495057;
                margin-bottom: 0.5rem;
            }
            
            .preview-placeholder span {
                font-size: 0.875rem;
                color: #6c757d;
            }
        `;
        
        document.head.appendChild(style);
        
        // 显示预览
        setTimeout(() => preview.classList.add('active'), 10);
        
        // 关闭预览
        const closeBtn = preview.querySelector('.preview-close');
        closeBtn.addEventListener('click', () => {
            preview.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(preview);
                document.head.removeChild(style);
            }, 300);
        });
        
        preview.addEventListener('click', (e) => {
            if (e.target === preview) {
                preview.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(preview);
                    document.head.removeChild(style);
                }, 300);
            }
        });
    }
    
    // 加载更多功能
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 加载中...';
            this.disabled = true;
            
            // 模拟加载更多内容
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-plus"></i> 加载更多作品';
                this.disabled = false;
                
                // 这里可以添加实际加载更多内容的逻辑
                showLoadMoreMessage();
            }, 2000);
        });
    }
    
    // 显示加载更多消息
    function showLoadMoreMessage() {
        const message = document.createElement('div');
        message.className = 'load-more-message';
        message.innerHTML = `
            <div class="message-content">
                <i class="fas fa-info-circle"></i>
                <span>已加载所有作品</span>
            </div>
        `;
        
        const loadMore = document.querySelector('.load-more');
        loadMore.appendChild(message);
        
        // 添加消息样式
        const style = document.createElement('style');
        style.textContent = `
            .load-more-message {
                margin-top: 1rem;
                padding: 1rem;
                background: #e9ecef;
                border-radius: 8px;
                text-align: center;
                color: #636e72;
            }
            
            .message-content {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);
        
        // 3秒后移除消息
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
            document.head.removeChild(style);
        }, 3000);
    }
    
    // 滚动动画
    const workItems = document.querySelectorAll('.work-item');
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    workItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
    
    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
    
    // 导航高亮
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.work-detail-modal, .image-preview-modal');
            modals.forEach(modal => {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            });
        }
    });
    
    // 移动端导航
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 添加移动端导航样式
    const mobileStyle = document.createElement('style');
    mobileStyle.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(mobileStyle);
    
    // 页面加载完成
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}); 