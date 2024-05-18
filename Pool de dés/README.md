# Outil de calcul des probabilités des dice pools

## Dice pool et difficulté

Un dice pool est un ensemble de dés que l'on lance (par exemple des D6). Dans certains systèmes, comme Shadowrun ou Vampire (World of Darkness), il est nécessaire de calculer un certain nombre de "réussites" obtenues, une réussité atant un dé dont la valeur est supérieure à une difficulté.

## Usage

```
> python3 proba-tool.py
Usage:
> python proba-pool.py [faces] [maxnumberofdice]
'faces' and 'maxnumberofdice' must be integers
We'll calculate probabilities of having successes versus difficulty (variable between 1 and [faces]) while throwing [maxnumberofdice] dice.

```

Le programme calcule toutes les difficultés possibles pour un dice pool de taille variable.

## Exemple

```
> python3 proba-pool.py 6 7
------------------ 1D6 ------------------
| Success # (at least) |   0   |   1   |
| Difficulty  0        | 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%|
| Difficulty  2        | 100.0%|  83.3%|
| Difficulty  3        | 100.0%|  66.7%|
| Difficulty  4        | 100.0%|  50.0%|
| Difficulty  5        | 100.0%|  33.3%|
| Difficulty  6        | 100.0%|  16.7%|
---------------------------------------------------
------------------ 2D6 ------------------
| Success # (at least) |   0   |   1   |   2   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%|  97.2%|  69.4%|
| Difficulty  3        | 100.0%|  88.9%|  44.4%|
| Difficulty  4        | 100.0%|  75.0%|  25.0%|
| Difficulty  5        | 100.0%|  55.6%|  11.1%|
| Difficulty  6        | 100.0%|  30.6%|   2.8%|
---------------------------------------------------
------------------ 3D6 ------------------
| Success # (at least) |   0   |   1   |   2   |   3   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%|  99.5%|  92.6%|  57.9%|
| Difficulty  3        | 100.0%|  96.3%|  74.1%|  29.6%|
| Difficulty  4        | 100.0%|  87.5%|  50.0%|  12.5%|
| Difficulty  5        | 100.0%|  70.4%|  25.9%|   3.7%|
| Difficulty  6        | 100.0%|  42.1%|   7.4%|   0.5%|
---------------------------------------------------
------------------ 4D6 ------------------
| Success # (at least) |   0   |   1   |   2   |   3   |   4   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%|  99.9%|  98.4%|  86.8%|  48.2%|
| Difficulty  3        | 100.0%|  98.8%|  88.9%|  59.3%|  19.8%|
| Difficulty  4        | 100.0%|  93.8%|  68.8%|  31.2%|   6.2%|
| Difficulty  5        | 100.0%|  80.2%|  40.7%|  11.1%|   1.2%|
| Difficulty  6        | 100.0%|  51.8%|  13.2%|   1.6%|   0.1%|
---------------------------------------------------
------------------ 5D6 ------------------
| Success # (at least) |   0   |   1   |   2   |   3   |   4   |   5   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%| 100.0%|  99.7%|  96.5%|  80.4%|  40.2%|
| Difficulty  3        | 100.0%|  99.6%|  95.5%|  79.0%|  46.1%|  13.2%|
| Difficulty  4        | 100.0%|  96.9%|  81.2%|  50.0%|  18.8%|   3.1%|
| Difficulty  5        | 100.0%|  86.8%|  53.9%|  21.0%|   4.5%|   0.4%|
| Difficulty  6        | 100.0%|  59.8%|  19.6%|   3.5%|   0.3%|   0.0%|
---------------------------------------------------
------------------ 6D6 ------------------
| Success # (at least) |   0   |   1   |   2   |   3   |   4   |   5   |   6   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%| 100.0%|  99.9%|  99.1%|  93.8%|  73.7%|  33.5%|
| Difficulty  3        | 100.0%|  99.9%|  98.2%|  90.0%|  68.0%|  35.1%|   8.8%|
| Difficulty  4        | 100.0%|  98.4%|  89.1%|  65.6%|  34.4%|  10.9%|   1.6%|
| Difficulty  5        | 100.0%|  91.2%|  64.9%|  32.0%|  10.0%|   1.8%|   0.1%|
| Difficulty  6        | 100.0%|  66.5%|  26.3%|   6.2%|   0.9%|   0.1%|   0.0%|
---------------------------------------------------
------------------ 7D6 ------------------
| Success # (at least) |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |
| Difficulty  0        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  1        | 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%| 100.0%|
| Difficulty  2        | 100.0%| 100.0%| 100.0%|  99.8%|  98.2%|  90.4%|  67.0%|  27.9%|
| Difficulty  3        | 100.0%| 100.0%|  99.3%|  95.5%|  82.7%|  57.1%|  26.3%|   5.9%|
| Difficulty  4        | 100.0%|  99.2%|  93.8%|  77.3%|  50.0%|  22.7%|   6.2%|   0.8%|
| Difficulty  5        | 100.0%|  94.1%|  73.7%|  42.9%|  17.3%|   4.5%|   0.7%|   0.0%|
| Difficulty  6        | 100.0%|  72.1%|  33.0%|   9.6%|   1.8%|   0.2%|   0.0%|   0.0%|
---------------------------------------------------
```

## Limitations

Attention : si vous tentez avec des pools de dés polyhédriques à beaucoup de faces et avec des tailles de pools importantes, il se peut que les calculs prennent longtemps.
