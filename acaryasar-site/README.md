# acaryasar.com

Kişisel tanıtım sitesi ve “iyi” ürün ailesinin tanıtım sayfaları. Mobile öncelikli, bağımlılıksız, statik HTML çıktısı üretir; her hostingde (cPanel/Apache, Netlify, Vercel, GitHub Pages, Cloudflare Pages) çalışır.

## Sayfalar

| Adres | İçerik | Demo butonu |
| --- | --- | --- |
| `/` | Ana sayfa: tanıtım, ürünler, hakkımda, teknolojiler, iletişim | — |
| `/iyiSinif` | iyiSınıf tanıtımı | https://iyisinif.acaryasar.com |
| `/iyiSite` | iyiSite tanıtımı | https://iyisite.acaryasar.com |
| `/iyiAvukat` | iyiAvukat tanıtımı | https://iyiavukat.acaryasar.com |
| `/iyiCrm` | iyiCRM tanıtımı | https://iyicrm.acaryasar.com |
| `/iyiBerber` | iyiBerber tanıtımı | https://iyiberber.acaryasar.com |
| `/iyiDernek` | iyiDernek tanıtımı | https://iyidernek.acaryasar.com |

(Alan adlarında büyük/küçük harf fark etmez; `iyiSinif.acaryasar.com` ile `iyisinif.acaryasar.com` aynı adrestir.)

## Kullanım

```bash
npm run build   # dist/ klasörünü üretir
npm run dev     # derler ve http://localhost:4173 adresinde önizler
```

Node.js 18+ yeterlidir, `npm install` gerekmez.

## İçeriği düzenleme

Tüm metinler `src/data.mjs` içindedir: isim, unvan, hakkımda metni, teknolojiler, sosyal linkler, e-posta ve ürünler (başlık, açıklama, renk, özellikler). Yeni ürün eklemek için `products` listesine bir kayıt eklemek yeterlidir; sayfası, kartı ve site haritası otomatik oluşur.

## Yapı

```
src/data.mjs        içerik
src/templates.mjs   sayfa şablonları (layout, ana sayfa, ürün sayfası, 404)
src/icons.mjs       satır içi SVG ikonlar
src/assets/         CSS, JS, favicon
static/.htaccess    Apache için https/www yönlendirmesi ve küçük harfli ürün adresleri
build.mjs           statik site üretici → dist/
serve.mjs           yerel önizleme sunucusu
```

## Natro'ya yükleme

1. `npm run package` → `acaryasar-natro.zip` oluşur (içinde yalnızca site dosyaları vardır).
2. Natro panelinde **Dosya Yöneticisi**'ni açın ve kök klasöre girin: cPanel'de `public_html`, Plesk'te `httpdocs`.
3. Eski siteyi yedekleyip (sıkıştırıp indirerek) klasörü boşaltın.
4. `acaryasar-natro.zip` dosyasını yükleyin, **Çıkart (Extract)** deyin ve zip dosyasını silin.
   `index.html` doğrudan `public_html` içinde olmalı, alt klasörde değil.
5. **SSL:** Panelden ücretsiz SSL'i aktif edin, ardından `.htaccess` içindeki https satırlarının başındaki `#` işaretlerini kaldırın.
   (Dosya Yöneticisi'nde gizli dosyaları göster seçeneğini açmanız gerekebilir.)
6. **Demo alt alan adları:** Panelde her demo için (`iyisinif`, `iyisite`, …) alt alan adı oluşturup ilgili demo uygulamasını oraya kurun ya da DNS'te demo sunucusuna `A`/`CNAME` kaydı ekleyin.

Windows (Plesk) paketlerinde `.htaccess` dikkate alınmaz, site yine sorunsuz çalışır; https yönlendirmesini Plesk'te **SSL/TLS → HTTP'den HTTPS'e kalıcı 301 yönlendirme** seçeneğiyle açın.

## Yayına alma (diğer servisler)

`dist/` klasörünün **içeriğini** hostingin kök dizinine (`public_html` vb.) yükleyin.

- **Apache/cPanel:** `.htaccess` dosyası da yüklenir; `/iyisinif` gibi küçük harfli adresleri doğru sayfaya yönlendirir.
- **Netlify / Vercel / Cloudflare Pages:** Build komutu `npm run build`, yayın klasörü `dist`, kök dizin `acaryasar-site`.

### Demo alt alan adları

Demo butonları `https://<ürün>.acaryasar.com` adreslerine gider. Bu alt alan adlarının ilgili demo uygulamasına işaret etmesi DNS tarafında yapılır (her biri için demo sunucusuna `CNAME` veya `A` kaydı).
