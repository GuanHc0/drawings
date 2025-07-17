// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 平滑滚动导航
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 如果是外部链接（不是以#开头），不阻止默认行为
            if (!targetId.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
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
    
    // 移动端导航菜单
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 滚动时更新活动导航链接
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
    
    // 时间线点击弹窗功能
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // 点击整个timeline-item显示详情弹窗
        item.addEventListener('click', function() {
            const dayNumber = item.querySelector('.day-number').textContent;
            const dayDate = item.querySelector('.day-date').textContent;
            const courseTitle = item.querySelector('.course-title').textContent;
            const dayData = item.getAttribute('data-day');
            
            const dayTitle = `${dayNumber} ${dayDate}`;
            showTimelineDetailModal(dayTitle, courseTitle, dayData);
        });
    });
    
    // 显示时间线详情弹窗
    function showTimelineDetailModal(dayNumber, courseTitle, dayData) {
        const modal = document.createElement('div');
        modal.className = 'timeline-detail-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${dayNumber} - ${courseTitle}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="timeline-detail-content">
                        <!-- 图片部分 -->
                        <div class="detail-section">
                            <h4>课程图片</h4>
                            <div class="course-image" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                                <i class="fas fa-palette"></i>
                                <span>${courseTitle}课程展示</span>
                            </div>
                        </div>
                        
                        <!-- 题目分析部分 -->
                        <div class="detail-section">
                            <h4>题目分析</h4>
                            <div class="topic-analysis">
                                <p>${courseTitle}是设计学习中的重要基础课程。通过系统性的学习和实践，学生将掌握相关的设计原理和技巧，为后续的深入学习奠定坚实基础。</p>
                                <div class="analysis-points">
                                    <div class="point">
                                        <i class="fas fa-check-circle"></i>
                                        <span>核心概念理解</span>
                                    </div>
                                    <div class="point">
                                        <i class="fas fa-check-circle"></i>
                                        <span>实践技能掌握</span>
                                    </div>
                                    <div class="point">
                                        <i class="fas fa-check-circle"></i>
                                        <span>创意思维培养</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- 优秀图纸部分 -->
                        <div class="detail-section">
                            <h4>优秀图纸</h4>
                            <div class="excellent-works">
                                <div class="work-item">
                                    <div class="work-preview" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                                        <i class="fas fa-star"></i>
                                        <span>优秀作品1</span>
                                    </div>
                                    <p>学生A的${courseTitle}作品，展现了扎实的设计功底和独特的创意视角。</p>
                                </div>
                                <div class="work-item">
                                    <div class="work-preview" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                                        <i class="fas fa-star"></i>
                                        <span>优秀作品2</span>
                                    </div>
                                    <p>学生B的${courseTitle}作品，体现了对设计原则的深入理解和创新应用。</p>
                                </div>
                                <div class="work-item">
                                    <div class="work-preview" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                                        <i class="fas fa-star"></i>
                                        <span>优秀作品3</span>
                                    </div>
                                    <p>学生C的${courseTitle}作品，展示了出色的技术执行力和艺术表现力。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加模态框样式
        const style = document.createElement('style');
        style.textContent = `
            .timeline-detail-modal {
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
            
            .timeline-detail-modal.active {
                opacity: 1;
            }
            
            .timeline-detail-modal .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 800px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .timeline-detail-modal.active .modal-content {
                transform: scale(1);
            }
            
            .timeline-detail-modal .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .timeline-detail-modal .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #636e72;
            }
            
            .timeline-detail-modal .modal-body {
                padding: 1.5rem;
            }
            
            .timeline-detail-content {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
            
            .detail-section h4 {
                color: #2d3436;
                margin-bottom: 1rem;
                font-size: 1.25rem;
                border-bottom: 2px solid #667eea;
                padding-bottom: 0.5rem;
            }
            
            .course-image {
                height: 200px;
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                position: relative;
                overflow: hidden;
            }
            
            .course-image::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
            }
            
            .course-image i {
                font-size: 3rem;
                margin-bottom: 1rem;
                position: relative;
                z-index: 1;
            }
            
            .course-image span {
                position: relative;
                z-index: 1;
                font-size: 1.125rem;
            }
            
            .topic-analysis p {
                color: #636e72;
                line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            
            .analysis-points {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .point {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #636e72;
            }
            
            .point i {
                color: #667eea;
                font-size: 1rem;
            }
            
            .excellent-works {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }
            
            .work-item {
                text-align: center;
            }
            
            .work-preview {
                height: 120px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 600;
                margin-bottom: 1rem;
                position: relative;
                overflow: hidden;
            }
            
            .work-preview::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
            }
            
            .work-preview i {
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                position: relative;
                z-index: 1;
            }
            
            .work-preview span {
                position: relative;
                z-index: 1;
                font-size: 0.875rem;
            }
            
            .work-item p {
                color: #636e72;
                font-size: 0.875rem;
                line-height: 1.5;
            }
            
            @media (max-width: 768px) {
                .excellent-works {
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
    }
    
    // 学生卡片动画
    const studentCards = document.querySelectorAll('.student-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);
    
    studentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });
    
    // 进度条动画
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // 浮动卡片动画增强
    const floatingCards = document.querySelectorAll('.card');
    
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-30px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                let current = 0;
                const increment = target / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, 30);
                
                statObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
    
    // 学生卡片点击事件
    studentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('view-works')) {
                const studentId = this.getAttribute('data-student');
                const studentName = this.querySelector('h3').textContent;
                
                // 创建模态框显示学生详情
                showStudentModal(studentName, studentId);
            }
        });
    });
    
    // 模态框功能
    function showStudentModal(name, id) {
        const modal = document.createElement('div');
        modal.className = 'student-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${name} 的作品集</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>正在加载 ${name} 的作品...</p>
                    <div class="loading-spinner"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 添加模态框样式
        const style = document.createElement('style');
        style.textContent = `
            .student-modal {
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
            
            .student-modal.active {
                opacity: 1;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .student-modal.active .modal-content {
                transform: scale(1);
            }
            
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #636e72;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #00b894;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 1rem auto;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
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
        
        // 模拟加载学生作品
        setTimeout(() => {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="student-works">
                    <div class="work-item">
                        <h4>第1天 - 设计基础入门</h4>
                        <p>完成了基础设计理论的学习，掌握了设计原则和元素。</p>
                        <div class="work-preview" style="background: linear-gradient(45deg, #667eea, #764ba2); height: 120px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            作品预览
                        </div>
                    </div>
                    <div class="work-item">
                        <h4>第2天 - 色彩理论</h4>
                        <p>学习了色彩搭配原理，创建了个人色彩方案。</p>
                        <div class="work-preview" style="background: linear-gradient(45deg, #f093fb, #f5576c); height: 120px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            作品预览
                        </div>
                    </div>
                    <div class="work-item">
                        <h4>第3天 - 排版设计</h4>
                        <p>掌握了字体选择和排版技巧，设计了文字布局。</p>
                        <div class="work-preview" style="background: linear-gradient(45deg, #4facfe, #00f2fe); height: 120px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                            作品预览
                        </div>
                    </div>
                </div>
            `;
        }, 1000);
    }
    
    // 页面加载完成后的初始化
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.student-modal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    if (modal.parentNode) {
                        document.body.removeChild(modal);
                    }
                }, 300);
            }
        }
    });
    
    // 性能优化：防抖滚动事件
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // 滚动停止后的处理
        }, 100);
    });
});

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
} 