## Como ejecutar el proyecto


Compartate y conectate a los datos de tu móvil para estar en la misma red. En android deberás cambiar el pad de bajo porque si tienes puesto el moderno te dará problemas.
IMPORTANTE, deberás modificar la IP de `appGaztaroa/comun/comun.js`.

```
git clone https://github.com/andermonreal/reactNative

cd appGaztaroa

npx expo start

cd json-server

npx json-server --host 10.162.101.132 db.json -p 3001 -d 2000
```