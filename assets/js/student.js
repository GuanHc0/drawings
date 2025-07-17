// 学生页面专用JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载完成后的初始化代码
    console.log('学生页面加载完成');
    
    // 为作业卡片添加悬停效果
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 