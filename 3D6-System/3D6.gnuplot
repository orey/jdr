#-------------------
# General parameters
#-------------------
set datafile separator ';'
set terminal png font "arial,8"

#-------------------
# Line styles and axis labels
#-------------------
set grid
set style line 1 linecolor 'blue' linetype 7 linewidth 3
set style line 2 linecolor 'red' linetype 7 linewidth 3
set style line 3 linecolor 'grey' linewidth 1
set style line 4 linecolor 'black' linewidth 1

set xlabel 'Number'
show xlabel

set ylabel 'Percentage of chance'
show ylabel

set xrange [3:18]

#-------------------
# First schema : 3D6 vs 1D16
#-------------------
set output '3D6.png'
set title "Probability of getting a certain number" font "arial,14"

# Geometry
set yrange [0:15]

# Draw vertical lines => no use replaced by "set grid"
#set arrow from 5, graph 0 to 5, graph 1 nohead ls 3
#set arrow from 10, graph 0 to 10, graph 1 nohead ls 3
#set arrow from 15, graph 0 to 15, graph 1 nohead ls 3

# Plot file values + draw horizontal lines
plot '3D6.csv' using 1:2 title "With 3D6"  with linespoints ls 1, \
     '3D6.csv' using 1:3 title "With 1D16" with linespoints ls 2

#-------------------
# Second schema : Under-threshold
#-------------------
set output 'under-threshold.png'
set title "Probability of rolling under - or equal to - a certain threshold" font "arial,14"

# Geometry
set yrange [0:115]

# Plot file values + draw horizontal lines
plot '3D6.csv' using 1:4 title "With 3D6"  with linespoints ls 1, \
     '3D6.csv' using 1:5 title "With 1D16" with linespoints ls 2, \
     100 notitle ls 4

#-------------------
# Thrid schema : above-threshold
#-------------------
set output 'above-threshold.png'
set title "Probability of rolling above - or equal to - a certain threshold" font "arial,14"

# Plot file values + draw horizontal lines
plot '3D6.csv' using 1:6 title "With 3D6"  with linespoints ls 1, \
     '3D6.csv' using 1:7 title "With 1D16" with linespoints ls 2, \
     100 notitle ls 4
