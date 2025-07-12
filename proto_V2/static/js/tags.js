function tags(target, tagName) {
    const tagsSelector = document.querySelectorAll('.tags .tags__tag button');
    const alreadyActive = target.classList.contains("active");
    const articles = document.querySelectorAll('.all-posts .post');

    tagsSelector.forEach(tag => tag.classList.remove("active"))
    if (!alreadyActive) {
        target.classList.add("active")
    }
    
    articles.forEach(article => {
        let articleTags = article.querySelectorAll('.post__tags--tag');
        articleTags.forEach(articleTag => {
            if ( articleTag.innerHTML.toLowerCase() !== tagName.toLowerCase() && !alreadyActive) {
                articleTag.classList.add("hide");
            } else {
                articleTag.classList.remove("hide");
            }
        });
    });
}