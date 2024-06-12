<template>
  <section>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Parkfi - {{ $t('colaborar.titulo') }}</p>
      </header>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <b-icon icon="car-brake-parking" type="is-link" size="is-large"></b-icon>
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">Parkfi</p>
            <p class="subtitle is-6">{{ $t('subtitulo') }}</p>
          </div>
        </div>
        <div class="content">
          <hr>
          {{ $t('colaborar.parte1') }}
          <a href="https://github.com/mau628">mau628</a>
          {{ $t('colaborar.parte2') }}
          <a href="https://www.buymeacoffee.com/mau628" target="_blank">Buy me a coffee</a>
          <br>
          <a href="https://www.buymeacoffee.com/mau628" target="_blank"><img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"
              style="height: 60px !important;width: 217px !important;"></a>
          <br>
          {{ $t('colaborar.parte3') }}
          <br>
          <br>
          {{ $t('colaborar.parte4') }}
          <a href="mailto:mau628@mau628.com">mau628@mau628.com</a>
          <br>
          <br>
          {{ $t('colaborar.parte5') }}
          <br>
          <br>
          <small>{{ $t('colaborar.parte6') }}</small>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item"><a href="https://github.com/mau628/parkfi"><b-icon icon="github"
              type="is-link" size="is-medium"></b-icon></a></a>
      </footer>
    </div>
  </section>
</template>