# Juego simple con Phaser

Este juego ha sido desarrollado por Carlos León Aznar. En este repositorio contiene una reorganización del código y de los assets usados para su desarrollo por Guillermo Jiménez


# GDD

#### Título:  
The Kreephaser
#### Motor gráfico: 
Phaser 3
#### Estilo gráfico: 
2D	
#### Género: 
Plataformas
#### Plataforma: 
Pc
#### Versión: 
1
#### Sinopsis de Jugabilidad y Contenido: 
Vivir la experiencia en distintos mundos de plataformas,  en donde tendrás que usar una llave para rescatar a los distintos miembros de la familia, y reunirlos a todos
#### Público: Para todos los públicos

### HISTORIAL DE VERSIONES
#### Hito 0:
Añadir el rescate de la familia, al introducir una llave en el nivel el usuario la debe obtener para salvar al miembro de la familia, donde la familia está compuesta por 4 miembros y en el último la llave se obtendrá venciendo al boss

### VISIÓN GENERAL DEL JUEGO
El protagonista de la historia será un padre de familia la cual ha sido secuestrada por unos alienígenas. Este padre debe recorrer distintos mundos para recuperar a su familia al completo y donde se encontrará con distintos obstáculos y enemigos. 
 
### MECÁNICA DEL JUEGO 
#### Mover
Haciendo uso de los controles del teclado el jugador podrá mover al personaje por los niveles del juego. El jugador haciendo uso de los controles podrá decidir la dirección de movimiento del personaje. Si el personaje se encuentra con un objeto movible podrá desplazar el objeto al moverse. El jugador deberá hacer uso de otras mecánicas debido a qué en los distintos niveles se encontrará con obstáculos qué impedirán su avance. Podemos encontrar dentro de esta mecánica la mecánica derivada del salto. 
#### Saltar: 
El personaje se impulsará hacia arriba  con un salto al pulsar el botón correspondiente. El personaje solo tiene las posibilidades de hacer doble salto y salto simple. El personaje debe volver a tocar una superficie para realizar alguno de los dos posibles saltos.
#### Atacar
El personaje podrá atacar a los enemigos de dos maneras. Saltando sobre ellos o utilizando la pistola. Estos ataques no producen daño sobre los objetos del juego, por lo qué no podrá usarlos para romper plataformas y obstáculos qué no sean enemigos.
#### Interactuar
El personaje podrá interactuar con 3 objetos distintos. Los cuales serán los corazones, las células de energía y las llaves. La recogida de estos objetos será automática por lo qué el jugador no tendrá la necesidad de pulsar ningún botón.
#### Pausar el juego
Al pulsar el botón de pausa del juego, toda acción se paralizará. Aparecerá un menú con estas opciones:  
##### Reanudar partida
##### Configuración de sonido
##### Configuración de musica 
##### Salir 

### INTERFACES
#### Pantalla de juego
En la pantalla del juego podemos ver las vidas qué le quedan al jugador y las células de energía qué tiene.
#### Pantalla de pausa
En esta pantalla tenemos 4 opciones:
##### Reanudar partida
##### Configuración de sonido
##### Configuración de musica 
##### Salir

#### Menú principal
##### Jugar: 
Comienza la partida.
##### Opciones:
##### Configuración de sonido y música
##### Configuración de controles
##### Creditos: 
Sale una lista de los creadores.
##### Salir: 
Te mantiene en la pantalla principal.
 
### NIVELES
#### Tutorial
##### Encuentro: 
Un tutorial, donde el jugador estará en un nivel básico para familiarizarse con los controles y objetivos
##### Objetivos: 
Encontrar la llave para al final del nivel salvar al primer miembro de la familia
##### Enemigos: 
1 enemigo npc
##### Items: 
Objetos de empujar, vidas y celulas de energia
##### Personajes: 
Personaje principal y el marciano verde.
##### Música y Efectos de Sonido: 

#### Nivel 1
##### Encuentro:
Una pantalla en la cual el jugador debe ir aplicando las distintas acciones que ha ido aprendiendo a lo largo del tutorial. Al mismo tiempo debe enfrentarse a su primer enemigo, este se va a encargar de poner las cosas difíciles al personaje principal
##### Objetivos:
Encontrar la llave para al final del nivel salvar al miembro de la familia
##### Enemigos: 
1 enemigo npc
##### Items: 
Objetos de empujar, vidas y celulas de energia
##### Personajes: 
Personaje principal y el marciano verde.
##### Música y Efectos de Sonido: 

#### Nivel 2
##### Encuentro: 
Es un nivel, en el que vamos a introducir objetos que realizan un movimiento permitiendo nuevas interacciones con el usuario, y debe ir moviéndose por toda la pantalla para ir recolectando el mayor número de ítems que permiten conocer nuevas acciones que puede hacer el jugador.
##### Objetivos: 
Encontrar la llave para al final del nivel salvar al miembro de la familia
##### Enemigos: 
4 enemigos npc
##### Items: 
Objetos de empujar,vidas y celulas de energia
##### Personajes: 
Personaje principal y los 4 marcianos verdes
##### Música y Efectos de Sonido: 
 
#### Nivel 3
##### Encuentro: 
En este nivel se introduce la animación del fuego el cual daña con 1 vida al protagonista. El fuego solo aparece en las rocas claramente diferentes al resto. 
##### Objetivos: 
Encontrar la llave para al final del nivel salvar al miembro de la familia
##### Enemigos: 
2 enemigos npc
##### Items: 
Vidas, celulas de energia
##### Personajes: 
Personaje principal y dos marcianos verdes
##### Música y Efectos de Sonido: 
  
#### Nivel 4
##### Encuentro: 
En este nivel vamos a encontrarnos con trampas más difíciles que restan más vida 
##### Objetivos: 
Encontrar la llave para al final del nivel salvar al miembro de la familia
##### Enemigos: 
1 enemigos npc y el boss
##### Items: 
Vidas, celulas de energia
##### Personajes: 
Personaje principal y dos marcianos verdes
##### Música y Efectos de Sonido: 
 
#### Reglas básicas
The Kreephaser como todo juego tiene sus propias reglas. A continuación estableceremos las condiciones de victoria y derrota.
##### Condiciones de victoria y derrota
La derrota ocurrirá cuando el jugador pierda todas las vidas. La pérdida de vidas puede ocurrir debido al daño producido por un enemigo, por la caída a un foso o por atravesar el fuego.
La victoria ocurrirá cuando el jugador supere todos los niveles del juego recuperando a todos sus familiares y haya derrotado al jefe final. El jefe final se encuentra en el último nivel del videojuego. 

#### PERSONAJES
En The kreephaser no hay posibilidad de elección del jugador. El protagonista siempre será el padre de la familia.

##### Vadum
Vadum es el marido y padre de una familia la cual ha sido secuestrada por unos enemigos. El protagonista de esta historia debe recorrer cada uno de los mundos adquiriendo las llaves necesarias para recuperar a cada miembro de su familia. En su recorrido se enfrentará a distintos enemigos con multitud de habilidades, Vadum podrá usar su pistola de plasma cuando obtenga células de energía para su funcionamiento.
|    Nombre       |  Daño  |  Vida   |   Nivel   |                                       Imagen                                          |
|    Vadum        |   1-2  |   6     |   Todos   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Hero-Boy-Run-Shoot1.png) |

##### ENEMIGOS
En cada nivel de juegos nos encontraremos diferentes enemigos propios de cada mundo.
|    Nombres      |  Daño  |   Nivel   |                                       Imagen                                          |
|---|---|---|---|
|    Jackal       |   1    | Tutorial  |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien1%20Walk1.png)      |
|    Shangheli    |   1    | Nivel 1   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien2%20Walk1.png)      |                                                 
|    Grunt        |   1    | Nivel 1   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien3%20Attack1_1.png)  |
|    Sapien       |  1,5   | Nivel 1   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien4%20Attack1_01.png) |                                                 
|    Feoña        |  1,5   | Nivel 2   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien5%20Walk1.png)      |                                                 
|    Drago        |  1,5   | Nivel 2   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Attack_1.png)      |                                                 
|    Ralp         |   2    | Nivel 2   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien7%20Death1.png)     |
|    Bozapatilla  |   2    | Nivel 2   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien8-Idle01.png)       |                                                 
|    Galrado      |  2,5   | Nivel 3-4 |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Idle_1.png)        |                                                 
|    Laon         |   2    | Nivel 3   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Idle_2.png)        |                                                 
|    Añatort      |   3    | Nivel 3-4 |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Idle_3.png)        |                                                 
|    Cocodry      |   2    | Nivel 3   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Jump_2.png)        |                                                 
|    Lobeznotird  |  2,5   | Nivel 4   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Jump_3.png)        |                                                 
|    Marinavja    |   3    | Nivel 4   |(https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Alien_Hit_1.png)         | 

#####BOSS
Crawler, es el que tiene secuestrado a los miembros de la familia de Vadum, tiene a su disposicion a un equipo de alinigenas y mutantes para hacerle la vida imposible a nuestro protagonista en su mision de recuperar a su familia. 
|    Nombre       |  Daño  |   Nivel   |                                       Imagen                                          |
|    Crawler      |   4    |      4    | (https://github.com/tolu9660/DVI/blob/main/assets/sprites/gdd/Boss%20Run1.png)        |


#### Armas 
El protagonista tendrá una pistola la cual dispara tiros normales, podrá cargar y disparar con más potencia si recolecta células de energía.
Los enemigos dispondrán de armas para atacar al protagonista.

#### Objetos
| **Objeto** | **Descripción** | **Imagen** |
| --- | --- | ---|
| **Corazón** | Este objeto le dará al jugador la capacidad de recuperar una vida por cada corazón recogido.  | ![corazon](https://github.com/tolu9660/DVI/blob/main/assets/sprites/corazon.png)
| **Celula de energia** | Este objeto dará al jugador la posibilidad de disparar su arma | ![célula de energía](https://github.com/tolu9660/DVI/blob/main/assets/sprites/energia.png)
| **Llave** | En cada nivel el protagonista deberá recoger la llave y es necesario para qué el personaje recupere a cada miembro de su familia. | ![llave](https://github.com/tolu9660/DVI/blob/main/assets/sprites/key.png)
| **Muro** | El jugador podrá encontrar muros los cuales podrá desplazar y usarlos como ventajas contra enemigos y obstáculos. | ![muro](https://github.com/tolu9660/DVI/blob/main/assets/sprites/piedra.png)

#### LOGROS
Cada vez que avanza los niveles, obtiene el logro de poder recuperar a un miembro más de su familia.

#### DETALLES DE PRODUCCIÓN
El equipo dividió las funciones en tareas y las repartió a los miembros del equipo en forma de spring semanales. En estas imágenes podemos observar las funciones definidas desde el principio hasta el momento.

#### MIEMBROS DEL EQUIPO

|Nombre                       | Diseño | Gestion | Arte | Comunicación | Implementación |
|---|---|---|---|---|---|
|Jesús Vélez Ayuso            |   22   |    25   |  10  |      25      |       40       |
|Álvaro Gómez Morán           |   30   |    20   |  30  |      25      |       20       |
|Luis Gabriel Román Santillán |   22   |    30   |  25  |      25      |       20       |
|David Domínguez Gutiérrez    |   26   |    25   |  35  |      25      |       20       |
