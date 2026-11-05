# Hébergement de l’EPK sur www.braidsplace.com

## Publication validée par Flo

Flo a confirmé le 5 novembre 2026 la validation des textes, médias, crédits, coordonnées et droits de publication. Le site React/Vite est publié depuis `main` avec le workflow GitHub Actions manuel `.github/workflows/deploy-pages.yml`. La base Vite est `/`, adaptée au domaine personnalisé.

Le dépôt de publication est `braidsplace/EPK-flo`. Dans **Settings → Pages**, la source est **GitHub Actions** et le domaine personnalisé est **www.braidsplace.com**. Aucun fichier `CNAME` n’est nécessaire avec ce workflow.

## DNS et vérification

Chez le fournisseur DNS, remplacer l’enregistrement `A` actuel de `www` (qui pointait vers `103.169.142.0`) et sa redirection vers le domaine racine par un `CNAME` : `www` → `braidsplace.github.io`. Ne pas ajouter `/EPK-flo` à la cible. Le domaine racine n’est pas inclus dans cette modification.

Dans **Actions → Deploy EPK to GitHub Pages**, lancer **Run workflow** sur `main`. Vérifier la réussite du build et du déploiement. Après propagation DNS, vérifier `dig www.braidsplace.com CNAME +short`, `https://www.braidsplace.com/` sur ordinateur et mobile, les médias, puis activer **Enforce HTTPS** dans **Settings → Pages** dès que le certificat est prêt. La propagation DNS peut prendre jusqu’à 24 heures.

Références : [déploiement Vite](https://vite.dev/guide/static-deploy.html#github-pages) et [domaine personnalisé GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
