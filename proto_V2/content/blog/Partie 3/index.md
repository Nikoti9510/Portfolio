---
title: "Tutoriel Hugo - Partie 3"
date: 2025-01-18T13:21:35.000Z
description: ""
type: blog
tags:
- Web
---

## Créer une liste de projet


Pour commencer, il faut créer les projets. Pour cela, allez dans le dossier `content`, et ajoutez un dossier avec le nom de notre choix, pour le tutoriel, j'ai choisi `projets`. Ce nom sera celui utilisé par Hugo pour déterminer le `type` de ces projets. On ajoute dans ce dossier un fichier `_index.md` afin de pouvoir passer des informations générales. Pour le moment, il peut simplement comprendre le titre de la page :


```markdown
---
title: "Mes projets"
--- 
```


Ajoutez ensuite au moins deux projets, sous le forme de dossier avec le nom que l'on souhaite donner au projet (pas d'espaces ni de caractères spéciaux). Dans chacun de ces dossiers, on ajoute un fichier markdown `index.md` avec le contenu. Voilà un exemple simple de projet : 


```markdown
---
title: Mon premier projet
date: 
description: Une description courte de mon projet.
type: projets
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque mollis risus ut magna fermentum, sed porttitor justo scelerisque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus vel varius libero. Suspendisse sed eros nunc. Mauris suscipit risus luctus nisi gravida, ac consequat ipsum efficitur. Nam feugiat lectus mauris, at pretium risus interdum nec. Nullam a ultricies diam. Duis tempor volutpat purus, quis condimentum mi elementum sit amet. Aenean et felis quis tellus tempus pellentesque nec et lacus. Etiam lobortis, quam in luctus congue, neque eros malesuada turpis, a egestas felis magna vitae lectus. In arcu orci, malesuada quis condimentum eu, posuere vel mi. Nullam dictum aliquam augue, nec dignissim diam porttitor quis. Fusce interdum sem dignissim augue tincidunt volutpat. Suspendisse potenti. Donec tempor accumsan augue vestibulum finibus.
```


On remarque que l'on a définit dans le `FrontMatter` le type de la page comme un `"projets"`, ce qui reprend le nom du dossier parent. Le champ date est laissé vide, on le complétera via le CMS quand celui-ci sera installé.


La structure doit ressembler à ça : 


![La structure de nos projets dans VScode](struct-projets-maj.png "La structure de nos projets dans VScode")


Pour mettre en place les projets, il faut ensuite créer deux nouveaux fichiers de template dans `layouts > _default`, `section.html` et `single.html`. Commençons par `section.html`, c'est lui qui va récupérer tout les projets et les présenter dans une liste complète. 


```go-template
{{ define "main" }}
    {{ .Content }}
    {{ range where .Site.RegularPages "Type" "projets" }}
        <h2><a href="{{ .RelPermalink }}">{{ .LinkTitle }}</a></h2>
    {{ end }}
{{ end }}
```


On réutilise la fonction `range` que l'on a vu plus haut, et on récupére les pages stockées dans la variable globale `Site`, tant que celles-ci sont de types `"projets"`. On laisse ici le tri des pages par défaut, mais il existe [plusieurs autres méthodes](https://gohugo.io/methods/pages/).


Pour voir le résultat, ajoutez un onglet dans le menu (via le fichier `Hugo.toml`) de la manière suivante : 


```toml
  [[menus.header]]
    name = 'Mes projets'
    url = '/projets'
    weight = 30
```


Un nouvel onglet est créé, et la page `Mes projets` récupère bien tous les projets que l'on a ajouté sur le site, et nous propose un lien vers ces pages. 


![Les projets affichés dans la page section](cest-notre-projet.png "Les projets affichés dans la page section")


Pour le moment, le site n'a pas de template pour afficher les projets unique, il faut donc le créer. C'est `single.html` qui s'en charge. Voilà un exemple très sommaire :


```go-template
{{ define "main" }}
<article>
  <h1>{{ .Title }}</h1>
  {{ .Content }}
</article> 
{{ end }}
```


Maintenant, si on clique sur un des projets, le contenu est correctement affiché :


![Le contenu d'un projet](contenu-projet.png "Le contenu d'un projet")


Pour l'exercice, essayez de créer un partial pour afficher le dernier projet sur votre page d'accueil. Je vous met la solution à la suite, mais prenez le temps d'essayer vous même, pour vous faire la main avec le fonctionnement de Hugo.

Ma solution :

Dans `layouts > partials`, créez un fichier `html` avec le contenu suivant : 


```go-template
<section>
    {{ range where .Site.RegularPages "Type" "projets" | first 1 }}
    <article>
        <h2>{{ .Title }}</h2>
        <p>{{ .Description }}</p>
        <p><a href="{{ .RelPermalink }}">lire la suite</a></p>
    </article>
    {{ end }}
</section>
```


Très similaire au template `section.html`, sauf que l'on récupère seulement le premier projet de la liste avec la fonction `first`, le chiffre à la suite détermine le nombre à afficher. Si on avait noté 3, alors la fonction aurait affiché les 3 premières pages trouvées. 


Pour que la description du projet que l'on appel ne soit pas vide, il faut lui ajouter dans le `FrontMatter` de la manière suivante : 


```markdown
---
title: "Mon premier projet"
type: "projets"
description : "Une description courte de mon projet."
--- 
```


Il ne reste plus qu'a ajouter le partial dans la page d'accueil, en passant par `home.html` : 


```go-template
{{ define "main" }}
    {{ .Content }}
    {{ partial "previewProjet.html" . }}
    <a href='/contact' class="btn">Contactez-moi</a>
{{ end }}
```


(J'ai ajouté le lien vers la page d'accueil ici et je l'ai supprimé du fichier `_index.html` contenant le contenu de la page).


Et voilà, le dernier projet s'affiche bien : 


![Notre partial fonctionne ](dernier-projet-page-accueil.png "Notre partial fonctionne")


Avec tout ce qu'on a vu, vous avez une base solide pour créer un premier site et prendre en main Hugo. Maintenant, passons à la mise en ligne.

---

