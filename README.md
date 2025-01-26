# El Confin Gaming

App web fullstack desarrollada con express y vite por Jef

### Scripts  

1. Copiar scripts (segun sistema operativo) y renombrarlos quitando el .dist
Linux:  
`cp linux_build_front.sh.dist linux_build_front.sh`  
`cp linux_launch_web.sh.dist linux_launch_web.sh`

Windows:  
`cp win_build_front.bat.dist win_build_front.bat`  
`cp win_launch_web.bat.dist win_launch_web.bat`

2. De ser necesario, modificarlos.

#### Permisos en linux  
`chmod u+rwx linux_build_front.sh`
`chmod u+rwx linux_launch_web.sh`

### Ejecucion de web al iniciar el sistema
Linux:  
Ejecutar:  
`crontab -e`  
Agregar:  
`@reboot sleep 30; /bin/bash /home/ruta/a/linux_launch_web.sh`

Windows:  
Agregar `win_launch_web.bat` a inicio.

### Puertos  
Windows: 8080 y 3000  
Linux:  
`sudo ufw allow 8080`  
`sudo ufw allow 3000`
