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

si se levanta el front en nginx, levantar solo el back:  
`@reboot sleep 30; /bin/bash /home/ruta/a/run_backend.sh`

Windows:  
Agregar `win_launch_web.bat` a inicio.

### Puertos  
Windows: 8080 y 3000  
Linux:  
`sudo ufw allow 8080`  
`sudo ufw allow 3000`

### Nginx

Se pude servir el front con nginx y liberar algo de recursos no sirviendo con npx.  

1. Instalar nginx:  
`sudo apt install nginx`  
2. Crear archivo de configuracion:  
`sudo nano /etc/nginx/sites-available/confin`   
3. Editar el archivo de configuracion:  
```
server {
    listen 80;
    server_name confin.ddns.net;

    root /home/confin/www;  # Ruta de tus archivos frontend
    index index.html;  # Página por defecto

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000;  # Dirección de tu backend HTTP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
4. Crear carpeta para servir front:  
`sudo mkdir /home/confin/www`   
5. Crear enlace simbolico de configuracion:  
`sudo ln -s /etc/nginx/sites-available/confin /etc/nginx/sites-enabled/`  
6. Verificar configuracion correcta de nginx:  
`sudo nginx -t`    
7. Copiar el build del front a www:  
`sudo cp -r /home/confin/web/frontend/dist/* /home/confin/www`  
8. Dar permisos de la carpeta a nginx:  
`sudo chown -R www-data:www-data /home/confin/www`  
`sudo chmod -R 755 /home/confin/www`   
9. Reiniciar nginx:  
`sudo systemctl restart nginx` 
10. abrir puertos:  
```  
sudo ufw allow 80/tcp  
sudo ufw allow 3000/tcp  
sudo ufw reload
sudo ufw status  
```

**Usar script run_backend en cron para ejecutar solo el backend al inciciar el sistema.**
  

### NGINX HTTPS
0. habilitar puerto https:  
`sudo ufw allow 443/tcp `
1. Instalar nginx:  
`sudo apt install nginx`  
2. Crear archivo de configuracion:  
`sudo nano /etc/nginx/sites-available/confin`   
3. Editar el archivo de configuracion:  
```
server {
    server_name confin.ddns.net;

    root /home/confin/www;  # Ruta de tus archivos frontend
    index index.html;  # Página por defecto

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass https://localhost:3000;  # Usar HTTPS en lugar de HTTP
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/confin.ddns.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/confin.ddns.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = confin.ddns.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

    listen 80;
    server_name confin.ddns.net;
    return 404; # managed by Certbot
}

```

4. habilitar configuracion personalizada:  
`sudo ln -s /etc/nginx/sites-available/confin /etc/nginx/sites-enabled/`

5. instalar bot certificado https:  
`sudo apt install certbot python3-certbot-nginx`  

6. solicitar certificado:  
`sudo certbot --nginx -d confin.ddns.net` 

7. verificar permisos certificados:  
`ls -l /etc/letsencrypt/live/confin.ddns.net/`  

8. Configurar permisos para que backend pueda acceder a certificados:  
```
sudo chmod 644 /etc/letsencrypt/archive/confin.ddns.net/*.pem
sudo chmod 640 /etc/letsencrypt/archive/confin.ddns.net/privkey1.pem

sudo chown -R confin:confin /etc/letsencrypt/live/confin.ddns.net
sudo chown -R confin:confin /etc/letsencrypt/archive/confin.ddns.net

```

9. probar configuracion nginx:  
`sudo nginx -t`  
10. recargar configuracion nginx:  
`sudo systemctl reload nginx`  
11. reiniciar nginx:  
`sudo systemctl restart nginx`

#### renovar certificado

`sudo certbot renew --dry-run`







