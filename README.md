# DB Generator Model App

Oracle, PostgreSql, Cassandra hedef veritabanı ile bağlantı kurularak JPA Spesifikasyonunda Model Java sınıflarının oluşturulması için geliştirmiş olan dbgenerator-api Spring Boot projesiyle konuşan web arayüzüdür.

### _'t-angular-boilerplate-keycloak' template üzerinden geliştirme yapılmıştır._

Modüler Angular projesi geliştirmesi için tasarlanmıştır. 

## **Proje bağımlılıkları**

Proje [Angular CLI](https://github.com/angular/angular-cli) versiyon 11.2.7 kullanılarak oluşturmuştur.

Ek olarak;

- [Material Angular](https://material.angular.io/) projeye dahil edilmiştir. `styles.scss` dosyasına özelleştirilmiş tema alanları eklenmiştir.

  `ng add @angular/material`

- [Ng-Select](https://github.com/ng-select/ng-select) kütüphanesi eklenmiştir. Materyal tasarım componentleri için `styles.scss` dosyasına ilgili css dosyası eklenmiştir.
  
  `npm install --save @ng-select/ng-select`

- Kimlik Yönetimi ve Yetkilendirme işlemleri için [Keycloak](https://www.npmjs.com/package/keycloak-angular) kütüphaneleri eklenmiştir. 

  `npm i --save keycloak-js`

  `npm i --save keycloak-angular`

## **Projeyi Geliştirme Sunucunda Koşturma**
`npm install` ile proje bağımlıkları yüklenmelidir.

`ng serve` komutu çalıştırılacak geliştirme sunucusunda proje ayağa kalkacaktır. `http://localhost:4200/` adresi kullanılarak projeye erişilebilir.

## **Projeyi Canlı Sisteme Alma**

Burada uygulamanın Tomcat sunucusuna nasıl yükleneceği anlatılmaktadır. Tomcat dosya dizininde uygulamalar `/webapps/` altında tutulmaktadır. Tomcate bir uygulama yüklendiğinde ilgili proje ismiyle Tomcat üzerinde bir subrouting url oluşmaktadır.

`index.html` dosyasına bu subrouting ile erişilmek istenildiğinde, eğer base-href bilgisi verilmez ise hata oluşmaktadır.

1. `ng build --prod --base-href /proje-ismi/` komutu çalıştırılarak `dist/` klasörü altında canlıya alınacak kodları içeren klasör otomatik oluşturulur.

2. Tomcat'e atılacak olan bu klasör ismi base-href deki verilen tanımlamadan farklı ise güncellenmelidir.

3. Bu klasör `/webapps/` dosya yoluna taşınması yeterli olacakıtr. Tomcat yüklenmeyi otomatik tamamlayacaktır.

### _**Tomcat'e yüklenen bu projeye DNS Tanımlaması ile erişilmek istenirse**_
Uygulamayı deploy etmek için `ng build` kullanılır. Uygulama Tomcat'e deploy etmek istediğimizde, Tomcat uygulamanın klasörü ismiyle altyol oluşturuyor. Bu yol üzerinden uygulamaya erişilmektedir. Varsayılan base-href="/". Eğer Base href tanımlaması yapılmaz ise, uygulamanın çağırdığı kütüphaneler root'tan yüklenmek istenecektir. Uygulamaya erişim altyoldan açıldığından çalışmayacaktır.

Uygulamanın koştuğu makineye Apache Server veya Nginx kullanılarak DNS tanımlaması uygulama katmanı ile Reserve Proxy yöntemi ile tanımlanmaktadır.
Bu erişim noktasında Reverse Proxy yönlendirilmesinden sonra, eğer base-href için "/" den farklı bir tanımlama yapılmış ise uygulama içerinde çağrılan kütüphanelerinin hatalı dosya yolundan yükleneceği için hata verecektir. 

Canlı sisteme alınacak kodların derlenmesi için, `ng build --prod` komutunun çalıştırılması yeterli olacaktır.

## **Proje Detayları**

Proje 4 ana yapıdan oluşmaktadır.
### Core
Proje temelinde bulunan Service, Guard, Interceptor fonksiyonları burada bulunmaktadır.
* _Guards_: Keycloak Rol tabanlı yetkilendirme ve module yüklenmesi kontrolü yapan Guard'ları içermektedir.
* _Interceptors_: Http gönderilen istek içerisine özel alanlar ekleme ve alınan HTTP cevaba göre Keycloak kimlik doğrulama işlemlerini içeren HTTP Interceptor ler içermektedir.
* _Services_: HttpClient ile Rest Api ile konuşulmasını yöneten servisi ve özelleştirilmiş servisleri içerir.

### Layout
Temel tasarım componentlerini barındırır. Masterpage componentler olarak düşünülebilir.
* _Content Layout_: Uygulama içerik alanlarının barınacağı componentlerin tasarım componenti
* _Auth Layout_: Kimlik kontrolü alanlarının barınacağı componentlerin tasarım componenti
* _Footer_: Altbilgi componenti
* _Nav_: Navigasyon menüsü componenti

### Modules
Uygulama içerisindeki her routing için bir module bulunmaktadır. Bu modüller içerisinde kendi alt routing fonksiyonu ve pages alanı bulunmaktadır. Pages içerisinde modül ile ilgili componentler tutulmaktadır.

İçerik oluşması adına 3 adet modül eklenmiştir.
* _Dashboard_: Kullanıcı ve Adminlerin işlem yapma yetkisi olan modüldür. Uygulama anasayfası olarak düşünülebilir.
* _Admin_: Sadece Adminlerin işlem yapma yetkisi olan modüldür.
* _Auth_: Kimlik doğrulama aksiyonları için eklenen modüldür. Yetkilenmeme durumuyla ilgili componenti içerir. Bunun yanı sıra login, register gibi componentler de bu modül içerisine eklenebilir.

### Shared
Proje içerisinde ortak kullanımda olan Component, Pipe, Directive, function, model, service gibi fonksiyonlar burada tutulmaktadır.

* _Services_: Validation ve Toast servisleri eklenmiştir.
* _Components_: Toast componenti ve Toast animasyon, konfigürasyonlarını içeren custom component bulunmaktadır.
* _Models_: Model sınıflarını içerir.
* _Material.module_: Angular Material Design Componentlerinin import, export larının tek bir noktaya toplandığı modüldür.

## **Projede Yapılması Gereken Düzenlemeler**
1. `index.html` ve `environment.ts` dosyalarında uygulama konfigürasyonları bulunmaktadır. Burada Keycloak tanımlamaları eklenmeli, Rest API bilgileri doldurulmalıdır. Birden fazla Rest API etkileşimi için tanımlamalar çoğaltılmalıdır.

2. Uygulamaya şu anda doğrudan erişilebilebilmektedir. Eğer kimlik doğrulama aktif hale getirilmek isteniyorsa Keycloak tanımlamaları hazır olduktan sonra, `app.module.ts` AppModule yorum haline bırakılmış alanlar açılıp, kaldırılması gereken yerler düzenlemelidir. 

3. `environment.ts` dosyasındaki `isMock` değeri false olarak güncellenmelidir. Böylelikle `content-layout.component.ts` içerisinde kullanıcı bilgileri mock yerine Keycloak servisinden yüklenecektir.

4. Modüllerde yetkilendirme katmanının etkileştirilmesi için, `app-routing.module.ts` dosyasındaki route dizisindeki yorum halinde tutulan Guard alanlarının açılmalıdır.
5. Proje detayları doğrultusunda, var olan modüller güncellenebilir, yeni componentler ve modüller eklenebilir.

