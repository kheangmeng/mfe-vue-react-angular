import { Component, Input, VERSION, computed, signal, OnInit, OnDestroy } from '@angular/core'
import { CurrencyPipe } from '@angular/common'

interface Product { id: number; name: string; price: number }

@Component({
  selector: 'mfe-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <section class="box">
      <h2>🅰️ Checkout (Angular {{ version }})</h2>
      <p>Customer: <strong>{{ user }}</strong></p>

      @if (items().length === 0) {
        <p>Nothing to check out yet.</p>
      } @else {
        <ul>
          @for (item of items(); track $index) {
            <li>{{ item.name }} — {{ item.price | currency }}</li>
          }
        </ul>
        <p>
          <strong>Total: {{ total() | currency }}</strong>
          <button (click)="checkout()">Place order</button>
        </p>
      }

      @if (lastOrder()) {
        <p class="ok">✅ Order placed: {{ lastOrder() }}</p>
      }
    </section>
  `,
  styles: [`
    .box { border: 2px solid #dd0031; border-radius: 8px; padding: 16px; }
    .ok { color: #15803d; }
    button { margin-left: 8px; }
  `],
})
export class AppComponent implements OnInit, OnDestroy {
  // Plain @Input works with cmp.setInput() from the mount function
  @Input() user = 'guest'

  version = VERSION.full
  items = signal<Product[]>([])
  total = computed(() => this.items().reduce((s, i) => s + i.price, 0))
  lastOrder = signal('')

  private onAdd = (e: Event) =>
    this.items.update((list) => [...list, (e as CustomEvent<Product>).detail])

  ngOnInit() {
    window.addEventListener('mfe:cart-add', this.onAdd)
  }
  ngOnDestroy() {
    window.removeEventListener('mfe:cart-add', this.onAdd)
  }

  checkout() {
    this.lastOrder.set(`${this.items().length} item(s), $${this.total()}`)
    // Tell the other MFEs (the Vue cart clears itself)
    window.dispatchEvent(new CustomEvent('mfe:checkout', { detail: { total: this.total() } }))
    this.items.set([])
  }
}
