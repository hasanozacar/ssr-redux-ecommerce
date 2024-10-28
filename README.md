# Online Mağaza Projesi

Bu proje, **Next.js** ile geliştirilmiş bir online mağaza uygulamasıdır. Proje, server-side rendering (SSR), state yönetimi (Redux), filtreleme, sayfalama, arama ve XSS güvenlik önlemleri gibi önemli özellikleri içermektedir. **Tailwind CSS** ile tasarım yapılmıştır.

## Proje İçeriği

### 1. Server-Side Rendering (SSR)
- Uygulama, SSR kullanılarak verilerin sunucu tarafında işlenmesini sağlar. Bu sayede daha hızlı yüklenme süreleri ve SEO avantajları elde edilir.
- `src/app/layout.tsx` dosyasında SSR yapılandırıldı.

### 2. State Management (Redux)
- Projede, ürünlerin yönetimi Redux aracılığıyla yapılmaktadır. Tüm ürün verileri Redux store'da tutulur ve UI bileşenleri arasında paylaşılır.
- `src/store/index.ts` ve `src/store/slices/products.ts` dosyalarında Redux ve dilim yapılandırması yer alır.

### 3. Filtreleme
- Ürünler kategori, fiyat aralığı ve isim bazında filtrelenebilmektedir. Filtreleme işlemleri optimize edilmiştir ve `useMemo` ile performans iyileştirilmiştir.
- Filtreleme işlemleri `src/app/page.tsx` dosyasında gerçekleştirilir.

### 4. Sayfalama (Pagination)
- Ürünler sayfalama ile gösterilmektedir. Her sayfada 8 ürün görüntülenir.
- Sayfalama işlemleri `useMemo` ile optimize edilmiştir.
  
### 5. Arama Özelliği
- Kullanıcılar ürünleri isimlerine göre arayabilir. Arama sonuçları gerçek zamanlı olarak güncellenir.

### 6. Cross-Site Scripting (XSS) Önlemleri
- Ürün detay açıklamaları `DOMPurify` ile sanitize edilmiştir, bu sayede XSS saldırılarına karşı koruma sağlanır.
- Bu özellik `src/app/products/[id]/page.tsx` dosyasında uygulanmıştır.

### 7. Veri Getirme (Data Fetching) ve SSR Entegrasyonu
- Ürün verileri, Next.js SSR ile sunucu tarafında `fetch` fonksiyonu kullanılarak çekilmektedir.
- Redux ile asenkron veri getirme işlemleri `createAsyncThunk` ile yönetilmiştir.

### 8. Hydration ve SEO Optimizasyonu
- **SEO**'yu iyileştirmek amacıyla sayfaya dinamik meta tag'ler eklenmiştir. Ayrıca Next.js'in SSR özellikleri sayesinde sayfalar hızlı yüklenir.
- Başlık ve meta açıklamaları `Head` bileşeni ile dinamik olarak tanımlanmıştır.

### 9. Redux Middleware ile API Çağrıları
- API çağrıları, Redux middleware ile yönetilmektedir. Proje ayrıca `redux-logger` kullanarak işlem takibi yapmaktadır.
- Örnek bir `apiMiddleware` middleware'i proje içinde tanımlanmıştır.

### 10. Performans Optimizasyonu ve State Normalization
- Ürün verileri **normalizr** kütüphanesi ile normalize edilmiştir, bu sayede büyük veri yapıları daha verimli işlenmektedir.
- Performans iyileştirmeleri için `useMemo` ve `useEffect` hook'ları kullanılmıştır.

### 11. Dinamik Rotalar ile Ürün Detay Sayfası (App Router)
- Her bir ürün için dinamik URL yapısı kullanılarak detay sayfaları oluşturulmuştur.
- Rota yapısı Next.js'in dinamik sayfa oluşturma özelliği ile sağlanmıştır. Ürün detay sayfası `src/app/products/[id]/page.tsx` dosyasında yer alır.

### 12. SEO ve Performans İyileştirme
- Projede SEO optimizasyonu için dinamik meta tag'ler eklenmiş, resimler **lazy loading** ile yüklenmiştir.
- Performans iyileştirme için `useMemo` ve Tailwind CSS'in optimize edilmiş class'ları kullanılmıştır.

### 13. Testing ve Güvenlik Uygulamaları
- **Jest** ile test altyapısı kurulmuştur. `jest-fetch-mock` kullanılarak API çağrıları test edilmiştir.
- XSS korumaları ve hata durumları için özel bileşenler oluşturulmuştur (`Error`, `Loading`).

## Kullanılan Teknolojiler
- **Next.js**: React framework'ü ile server-side rendering ve static site generation.
- **Redux**: Global state yönetimi.
- **Tailwind CSS**: Hızlı ve responsive tasarımlar için utility-first CSS framework.
- **Jest**: Test framework'ü.
- **DOMPurify**: XSS koruması için kullanılan kütüphane.
- **Normalizr**: Redux state normalizasyonu.

## Projeyi Çalıştırma

Projeyi çalıştırmak için şu adımları izleyin:

1. Bağımlılıkları yükleyin:

   ```bash
   npm install

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
