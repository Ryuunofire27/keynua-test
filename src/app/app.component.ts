import { Component } from '@angular/core';

import { Platform, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { URL as MoURL } from 'url';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import * as $script from 'scriptjs';

declare var Keynua: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private tokenInputValue: string = '';


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private iab: InAppBrowser,
    private webView: WebView,
    private toastController: ToastController,
    private andPerms: AndroidPermissions,
    private mediaCapture: MediaCapture,
    private camera: Camera,
    private alertController: AlertController
  ) {
    /*const url = new MoURL()
    if(URL && webkitURL){
      URL.createObjectURL = webkitURL.createObjectURL || URL.createObjectURL;
    }*/
    this.initializeApp();
  }

  insertScript(src: string): Promise<void>{
    
    return new Promise((res, rej) => {
      try {
        const head = document.head;
        console.log(head);
        const scriptEl = document.createElement('script');
        const timeoutObj = setTimeout(() => {
          clearTimeout(timeoutObj);
          return rej(new Error('No se ha podido cargar el script.'))
        }, 10000);

        scriptEl.onload = function(...ev){
          console.log(ev);
          clearTimeout(timeoutObj)
          return res();
        }
        scriptEl.onerror = function(...ev){
          console.log(ev)
          clearTimeout(timeoutObj)
          return rej(new Error('No se ha podido cargar el script.'))
        }
        scriptEl.src = src;
        head.appendChild(scriptEl);

      } catch (error) {
        console.log(error)
        return rej(new Error('Error al cargar el script'));
      }
    })
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      try {
        //await this.insertScript('https://192.168.86.204:3050/widget.js')
        await this.insertScript("https://sign.dev.keynua.com/widgets/widget.js")
        console.log(Keynua);

        //this.openBrowser('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJiNDJmNWViMC03ZTlkLTExZWEtOGMyZi00OWQ3M2JjMDZhMmJlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5zdGcua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6IjM1OTIwZGNkZDBkYjMwZmU0MThmNTc3OGIyMTlhYTJkNWRmMzM2ZjU4OWZmZWYxMzA4NGZjZjE3YmQ0NGMyY2MifQ.U3kUAxxqcQBTxoB1mjXnDjIAaaxXEvxsFyM_3CsY0x8');
        this.openKeynuaWidget();
      } catch (error) {
        console.log(error);
        this.alertController.create({
          header: 'Keynua script error',
          message: error.message  || error.msg,
          buttons: ['ok']
        })
          .then((res) => {
            res.present()
          })
      }
    });
  }

  async openKeynuaWidget(){
    const isAndroid = this.platform.is("android")

    if(isAndroid){
      /*console.log("is android");
      try {
        const cameraRes = await this.andPerms.checkPermission(this.andPerms.PERMISSION.CAMERA);
        console.log("Camera permission: ");
      } catch (error) {
        await this.andPerms.requestPermission(this.andPerms.PERMISSION.CAMERA);
      }
      await this.andPerms.requestPermissions([this.andPerms.PERMISSION.CAMERA]);*/




      //console.log(cameraRes)

      /*const video = await this.mediaCapture.captureVideo({
        duration: 0,
        limit: 0
      })*/

      const res = await this.andPerms.requestPermissions(
        [
          this.andPerms.PERMISSION.CAMERA,
          this.andPerms.PERMISSION.INTERNET,
          this.andPerms.PERMISSION.RECORD_AUDIO,
          this.andPerms.PERMISSION.RECORD_VIDEO,
          this.andPerms.PERMISSION.MODIFY_AUDIO_SETTINGS,
          this.andPerms.PERMISSION.WRITE_EXTERNAL_STORAGE,
          this.andPerms.PERMISSION.READ_EXTERNAL_STORAGE,
        ]
      )
      console.log(res);
    }
    const tokenValue = this.tokenInputValue || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiI2YTJjNjNhMC04YTY3LTExZWEtYWMxNS1mYmM3MzdmMDQyMzJlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5kZXYua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6IjI5OGQyYTNmM2E0OGM1MTk0ZjIxNDQxMzk3MzkwMmEyYzZlNDQ3MTE2ZTkwOGViMzIxZDI4N2M3OGVlOWNjYTEifQ.KSUX2dAjgkAqgIUoP3Dz60dk-WSzgQHhR4qftT6bFz8';
    console.log(tokenValue);
    /*if(tokenValue == ''){
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ingresa el token de contrato.',
        buttons: ['ok']
      });
      return await alert.present();
    }*/
    //'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJiNDJmNWViMC03ZTlkLTExZWEtOGMyZi00OWQ3M2JjMDZhMmJlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5zdGcua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6IjM1OTIwZGNkZDBkYjMwZmU0MThmNTc3OGIyMTlhYTJkNWRmMzM2ZjU4OWZmZWYxMzA4NGZjZjE3YmQ0NGMyY2MifQ.U3kUAxxqcQBTxoB1mjXnDjIAaaxXEvxsFyM_3CsY0x8'
    //this.openBrowser(tokenValue)
    /*{ ionic: true, token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiI2YTJjNjNhMC04YTY3LTExZWEtYWMxNS1mYmM3MzdmMDQyMzJlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5kZXYua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6IjI5OGQyYTNmM2E0OGM1MTk0ZjIxNDQxMzk3MzkwMmEyYzZlNDQ3MTE2ZTkwOGViMzIxZDI4N2M3OGVlOWNjYTEifQ.KSUX2dAjgkAqgIUoP3Dz60dk-WSzgQHhR4qftT6bFz8 }*/
    Keynua.run({
      ionic: true,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiI2YTJjNjNhMC04YTY3LTExZWEtYWMxNS1mYmM3MzdmMDQyMzJlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5kZXYua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6IjI5OGQyYTNmM2E0OGM1MTk0ZjIxNDQxMzk3MzkwMmEyYzZlNDQ3MTE2ZTkwOGViMzIxZDI4N2M3OGVlOWNjYTEifQ.KSUX2dAjgkAqgIUoP3Dz60dk-WSzgQHhR4qftT6bFz8',
      uiCallback: (ev) => console.log(ev)
    });
  }

  async openBrowser(token: string){
    console.log("Abriendo browser");

    const isAndroid = this.platform.is("android")

    if(isAndroid){
      /*console.log("is android");
      try {
        const cameraRes = await this.andPerms.checkPermission(this.andPerms.PERMISSION.CAMERA);
        console.log("Camera permission: ");
      } catch (error) {
        await this.andPerms.requestPermission(this.andPerms.PERMISSION.CAMERA);
      }
      await this.andPerms.requestPermissions([this.andPerms.PERMISSION.CAMERA]);*/




      //console.log(cameraRes)

      /*const video = await this.mediaCapture.captureVideo({
        duration: 0,
        limit: 0
      })*/

      const res = await this.andPerms.requestPermissions(
        [
          this.andPerms.PERMISSION.CAMERA,
          this.andPerms.PERMISSION.INTERNET,
          this.andPerms.PERMISSION.RECORD_AUDIO,
          this.andPerms.PERMISSION.RECORD_VIDEO,
          this.andPerms.PERMISSION.MODIFY_AUDIO_SETTINGS,
          this.andPerms.PERMISSION.WRITE_EXTERNAL_STORAGE,
          this.andPerms.PERMISSION.READ_EXTERNAL_STORAGE,
        ]
      )
      console.log(res);
    }

    /*Keynua.run({
      token,
      uiCallback: (ev) => console.log(ev)
    });*/
    
    //const keynuaHtml = this.webView.convertFileSrc('../assets/template/keynua.html');

    //this,this.webView.

    //const keynuaPage = 'https://dh51m16tnbeo9.cloudfront.net/';
    const keynuaPage = 'https://6d2f8301.ngrok.io/keynua.html';
    
    
    const browser = this.iab.create(keynuaPage, '_system', {
      hidden: 'yes',
      footer: "no",
      hardwareback: "no",
      location: "no",
    })

    let keynuaPageLoaded = false;

    browser.show();

    browser.on('beforeload')
      .subscribe(obs => {
        console.log(obs)
      })
    
    

    browser.on('loadstart')
      .subscribe(obs => {
        console.log(obs);
      })

    browser.on('loadstop')
      .subscribe(obs => {
        console.log(obs)
        if(!keynuaPageLoaded){
          keynuaPageLoaded = true;
          browser.executeScript({
            code: `\
            Keynua.run({\
              token: '${token}',\
              uiCallback: (ev) => console.log(ev)\
            });`
          })
          .then((res) => {
            console.log("Keynua execute script:\n", res);
          })
        }
      })


    browser.on('customscheme')
      .subscribe(obs => {
        console.log(obs)
      })

    browser.on('loaderror')
      .subscribe(obs => {
        console.log(obs)
      })

    browser.on('message')
      .subscribe(obs => {
        console.log(obs)
      })

    browser.on('exit')
      .subscribe(obs => {
        console.log(obs);
      })
    
    //browser.show();
    //const keynuaHtml = this.webView.convertFileSrc('../assets/template/keynua.html');
    /*const browser = this.iab.create('https://63e5515f.ngrok.io/keynua.html', '_self', {
      location: "no",
      footer: "no",
      hidden: "yes",
      beforeload: "yes"
    });
    let evs = [];
    browser.on('loadstart').subscribe(async (ev) => {
      console.log(ev);
      (await this.toastController.create({
        message: JSON.stringify(ev),
        position: "top",
        duration: 1000,
      })).present();
    });

    browser.on('loadstop').subscribe(async (ev) => {
      console.log(ev);
      (await this.toastController.create({
        message: JSON.stringify(ev),
        position: "top",
        duration: 1000,
      })).present();
    });
    browser.on('loaderror').subscribe(async (ev) => {
      console.log(ev);
      (await this.toastController.create({
        message: JSON.stringify(ev),
        position: "top",
        duration: 1000,
      })).present();
    });

    browser.on('beforeload').subscribe(async (ev) => {
      console.log(ev);
      (await this.toastController.create({
        message: JSON.stringify(ev),
        position: "top",
        duration: 1000,
      })).present();
    });

    browser.on('message').subscribe(async (ev) => {
      console.log(ev);
      (await this.toastController.create({
        message: "mensaje entrante",
        position: "middle",
        duration: 1500,
      })).present();
    });

    let browserExecuteScriptResponse = null;
    browser.on('loadstop')
      .subscribe(async (event) => {
        await browser.executeScript({
          code: "\
          window.opener.postMessage('Enviando mensaje', '*');"
        })
        /*const window = await browser.executeScript({
          code: 'window'
        });*/

        //browser.show();
        /*if(window) {
          console.log(window)
          await (await this.toastController.create({
            message: await JSON.stringify("Cargo window"),
            position: "top",
            duration: 1500,
          })).present();
          window.executeIonCallback = function(){
            console.log("ExecutingIonCallback");
            browser.close();
          }
        }*/

        
        /*const res = await browser.executeScript({
          code: `window.Keynua.run({
              token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJjNTU0NTgzMC03M2I3LTExZWEtYjE1NC0xYmEyMzhkNmY3Y2NlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5zdGcua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6ImIwYTEwNDBmMDdhYzgyMjI2ZDNiMzI1ZjhkMDBjYmY0NjI3ZmE5ZGQ5NTdmN2U1MTcyZWNhOGQxNzkwZmJhY2QifQ.qzLLOB9JiQn7rG0rnPaIW7HcNn7jKEJI_hZf3iioroQ",
              uiCallback: (ev) => {
                console.log(ev);
                if(ev && (ev.eventName === 'start-view' || ev._eventName === 'start-view')) {
                  console.log(window.executeIonCallback)
                  window.executeIonCallback && window.executeIonCallback();
                }
              }
            });`
            //'window.Keynua'
        })*/
        //browser.show();
        /*console.log(res);
        if(res){
          res.run({
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjaWQiOiJjNTU0NTgzMC03M2I3LTExZWEtYjE1NC0xYmEyMzhkNmY3Y2NlMSIsInRva2VuX3VzZSI6InNpZ24iLCJpc3MiOiJodHRwczovL2FwaS5zdGcua2V5bnVhLmNvbS9jb250cmFjdHMiLCJ1aWQiOjAsInBpZCI6ImIwYTEwNDBmMDdhYzgyMjI2ZDNiMzI1ZjhkMDBjYmY0NjI3ZmE5ZGQ5NTdmN2U1MTcyZWNhOGQxNzkwZmJhY2QifQ.qzLLOB9JiQn7rG0rnPaIW7HcNn7jKEJI_hZf3iioroQ',
            uiCallback: (ev) => {
              console.log(ev);
              evs.push(ev);
            }
          })
        }
        browserExecuteScriptResponse = res;
        /*(await this.toastController.create({
          message: res
        })).present();*/
      //})
    
    /*setTimeout(async() => {
      browser.close();
      (await this.toastController.create({
        message: JSON.stringify(browserExecuteScriptResponse),
        position: "top",
        duration: 10000,
      })).present();
      (await this.toastController.create({
        message: JSON.stringify(evs),
        duration: 10000
      })).present();
    }, 20000)
    const onloaderror = browser.on('loadstart')
    console.log(onloaderror)
    console.log(browser);*/
  }
}
