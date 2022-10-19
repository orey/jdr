# Simuler des dés à multiples faces avec des D6

## Logique de base

Lorsque l'on veut simuler des dés ayant un nombre de faces quelconque avec des dés à 6 faces (d6), il faut juste comprendre comment on compte dans des bases autre que 10.

Car, bien entendu, tout le monde comprend pourquoi on ne peut pas simuler 1d12 avec 2d6, n'est-ce pas ? Tout d'abord parce que 1d12 va de 1 à 12 et que 2d6 vont 2 à 12 ; et ensuite parce que les probabilités d'apparition d'un chiffre dans le cadre de 1d12 sont de 1/12 alors qu'elles suivent une courbe en cloche dans le cas de 2d6.

L'objectif de cet article est donc bien que l'on simule, avec des d6 uniquement, 1dN, avec la probabilité d'apparition de chaque chiffre soit 1/N.

La logique de base à comprendre est justement la comptabilité en bases différentes de 10. Les informaticiens connaissent bien le sujet avec des ordinateurs pouvant travailler en base 2 (binaire), en base 8 (octale) ou en base 16 (hexadécimale).

Pour ce petit exercice, nous allons compter en base 6. En base 6, le fait est qu'il n'y a pas de 6 mais seulement 6 symboles. On ne dispose que des symboles suivants : 0, 1, 2, 3, 4 et 5.

Les additions fonctionnent de la manière suivante : 5 + 1 = 10, 10 étant entendu comme 1 x 6 soit 6 en décimal. 10 + 1 = 11 en base 6 ce qui donne 6 + 1 = 7 en base 10.

Ce petit tableau donne une vision plus complète du sujet.

| Base 10 | Base 6 |
|---------|---|
| 1 | 1 |
| 2 | 1 |
| 3 | 1 |
| 4 | 1 |
| 5 | 1 |
| 6 | 10 |
| 7 | 11 |
| 8 | 12 |
| 9 | 13 |
| 10 | 14 |
| 11 | 15 |
| 12 | 20 |
| 13 | 21 |
| 14 | 22 |
| 15 | 23 |
| 16 | 24 |
| 17 | 25 |
| 18 | 30 |
| 19 | 31 |
| 20 | 32 |

Vous noterez que 32 est écrit avec 2 chiffres, et donc que l'on peut le tirer avec 2d6, en prenant un pour les dizaines, ou plutôt les "sixaines", et un pour les unités.

## Funky dice

Certains jeux ont besoin de dés très étranges comme DCC (Dungeon Crawl Classics).

Voyons comment nous pouvons faire pour les premiers.

| Type de dé | Lancer 1d6 |
|----------|---|
| 1d2 | Impair => 1, pair => 2 |
| 1d3 | 1-2 => 1, 3-4 => 2, 5-6 => 3 |
| 1d4 | 1 => 1, 2 => 2, 3 => 3, 4 => 4, relancer si 5 ou 6 |
| 1d5 | 1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5, relancer si 6 |

Nous supposerons que nous savons maintenant faire les d2, d3, d4 et d5 avec 1d6.

Pour les autres dés, nous allons utiliser 1d6 de "sixaine", de couleur différente : nous ne nommerons `S`. L'autre dé sear celui des unités et sera noté `U`. En tirant les deux dés, pour connaître le résultat, nous ferons donc `S x 6 + U`.

| Type de dé | Lancer 2d6 : S et U | Formule | Commentaire |
|---------|---|---|---|
| 1d7 | S = 1d2, U = 1d4 | (1d2 - 1) x 4 + 1d4, relancer si 8 | Base 4 |
| 1d8 | S = 1d2, U = 1d4 | (1d2 - 1) x 4 + 1d4 | Base 4 |
| 1d9 | S = 1d2, U = 1d5 | (1d2 - 1) x 5 + 1d5, relancer si 10 | Base 5 |
| 1d10 | S = 1d2, U = 1d5 | (1d2 - 1) x 5 + 1d5 | Base 5 |
| 1d11 | S = 1d2, U = 1d6 | (1d2 - 1) x 6 + 1d6, relancer si 12 | Base 6 |
| 1d12 | S = 1d2, U = 1d6 | (1d2 - 1) x 6 + 1d6 | Base 6 |
| 1d13 | S = 1d3, U = 1d5 | (1d3 - 1) x 5 + 1d5, relancer si 14 et 15 | Base 5 |
| 1d14 | S = 1d3, U = 1d5 | (1d3 - 1) x 5 + 1d5, relancer si 15 | Base 5 |
| 1d15 | S = 1d3, U = 1d5 | (1d3 - 1) x 5 + 1d5 | Base 5 |
| 1d16 | S = 1d4, U = 1d4 | (1d4 - 1) x 4 + 1d4 | Base 4 |
| 1d17 | S = 1d3, U = 1d6 | (1d3 - 1) x 6 + 1d6, relancer si 18 | Base 6 |
| 1d18 | S = 1d3, U = 1d6 | (1d3 - 1) x 6 + 1d6 | Base 6 |
| 1d19 | S = 1d4, U = 1d5 | (1d4 - 1) x 5 + 1d5, relancer si 20 | Base 5 |
| 1d20 | S = 1d4, U = 1d5 | (1d4 - 1) x 5 + 1d5 | Base 5 |
| 1d30 | S = 1d5, U = 1d6 | (1d5 - 1) x 6 + 1d6 | Base 6 |

## Comment faire 1d100 avec des d6 ?

Certes, vous pouvez utiliser la formule ci-dessus pour tirer alternativement 1d10 pour les dizaines et 1d10 pour les unités. Mais, nous pouvons chercher quelque chose de plus direct.

Cherchons en base 6. 100 en base 10 = 244 en base 6, car :

    244 = **2** x 6^2 + **4** x 6^1 +  **4** x 6^0
    
Si nous lançons 3d6 avec trois dés C, S et U :

* C serait 1d3-1, ce qui est facile ;
* Mais S devrait pouvoir avoir toutes les valeurs du d6 ;
* Pareil pour U ;
* Avec la contrainte que tout nombre supérieur à 100 n'est pas applicable, et qu'il faut donc le rejouer.

Nous aurions donc : R = (1d3 - 1) x 6^2 + (1d6 - 1) x 6 + 1d6

Avec C imposé à 2 comme valeur maximale, nous arrivons donc à une valeur maximale avec la formaule ci-dessus de 2 x 36 + 5 x 6 + 6 = 108. Il faudrait donc éliminer les R entre 101 et 108 (donc 8 combinaisons.

Nous pouvons faire mieux.

Considérons la base 5. 100 = 4 x 25 = 4 x 5^2 + 0 x 5^1 + 0 x 5^0. .

Nous avons donc :

* C entre 0 et 3, soit 1d4-1, ce qui donne C entre 0 et 75,
* S entre 0 et 4, soit 1d5-1, ce qui donne S entre 0 et 20,
* Et U entre 1 et 5, soit 1d5.

Donc :

    1d100 = (1d4-1) x 25 + (1d5 - 1) x 5 + 1d5
    
C'est le plus simple tirage.

