import { BehaviorSubject, Observable } from 'rxjs';

export class SelectionManager<C extends { oid: string; selected?: boolean }> {
  _items: C[] = [];
  private _itemsSubject: BehaviorSubject<C[]> = new BehaviorSubject<C[]>([]);
  public readonly items$: Observable<C[]> = this._itemsSubject.asObservable();

  public length: number = 0;

  constructor() {}

  private _selectedOidsHashMap: { [key: string]: C } = {};

  private _enabled: boolean = false;
  private _showSelected: boolean = false;
  private _isSingleSelectionMode: boolean = false;

  public get items(): C[] {
    return this._items;
  }

  public setItems(items: C[]): void {
    this._items = items || [];
    this._updateSelectionState();
  }

  public clearSelection(): void {
    this._selectedOidsHashMap = {};
    this.showSelected = false;
    this._updateSelectionState();
  }

  public hasSelection(): boolean {
    return Object.keys(this._selectedOidsHashMap).length > 0;
  }

  public getSelection(): string[] {
    return Object.keys(this._selectedOidsHashMap);
  }

  public getDropzoneSelection(oid: string): string[] {
    const selection: string[] = Object.keys(this._selectedOidsHashMap);
    if (this.enabled && selection.length && selection.indexOf(oid) !== -1) {
      return selection;
    }
    return [oid];
  }

  public getSelectedItemsCount(): number {
    return this.getSelection().length;
  }

  public setSelection(items: C[]): void {
    this._selectedOidsHashMap = {};
    items.forEach((item: C) => {
      this._selectedOidsHashMap[item.oid] = item;
    });
    this._updateSelectionState();
  }

  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(enabled: boolean) {
    this._selectedOidsHashMap = {};
    this._enabled = enabled;
    this._updateSelectionState();
  }

  public get isSingleSelectionMode(): boolean {
    return this._isSingleSelectionMode;
  }

  public set isSingleSelectionMode(isSingleMode: boolean) {
    this._isSingleSelectionMode = isSingleMode;
  }

  public get showSelected(): boolean {
    return this._showSelected;
  }

  public set showSelected(showSelected: boolean) {
    this._showSelected = showSelected;
    this._updateSelectionState();
  }

  public select(oid: string, select: boolean, item?: C): void {
    if (select) {
      this._selectedOidsHashMap[oid] = { ...item, selected: true } as C;
    } else {
      delete this._selectedOidsHashMap[oid];
    }
    this._updateSelectionItemState(oid);
  }

  public selectInSingleMode(oid: string, select: boolean, item?: C): void {
    Object.keys(this._selectedOidsHashMap).forEach((key: string) => {
      delete this._selectedOidsHashMap[key];
    });

    if (select) {
      this._selectedOidsHashMap[oid] = { ...item, selected: true } as C;
    }
    this._updateSelectionItemStateForSingleSelect(oid);
  }

  public isSelected(oid: string): boolean {
    return !!this._selectedOidsHashMap[oid];
  }

  public toggleSelection(item: C): void {
    if (this.isSingleSelectionMode) {
      this.selectInSingleMode(item.oid, !this.isSelected(item.oid), item);
    } else {
      this.select(item.oid, !this.isSelected(item.oid), item);
    }
  }

  private _updateSelectionState(): void {
    let updatedItems: C[] = [];
    if (this._showSelected) {
      // Case: user select show only selected
      updatedItems = Object.values(this._selectedOidsHashMap);
    } else {
      // Case: update items on response
      updatedItems = this._items.map((item: C) => {
        const newState = {
          ...item,
          selectionEnabled: this.enabled,
          selected: this.isSelected(item.oid),
        };
        if (this.isSelected(item.oid)) {
          this.select(item.oid, true, newState);
        }
        return newState;
      });
    }
    this.length = Object.keys(this._selectedOidsHashMap).length;

    this._itemsSubject.next(updatedItems);
  }

  private _updateSelectionItemState(oid: string): void {
    const updatedItems: C[] = this._itemsSubject.getValue().map((item: C) => {
      if (oid === item.oid) {
        this.length += this.isSelected(oid) ? 1 : -1;
        return { ...item, selected: this.isSelected(oid) };
      }
      return item;
    });
    this._itemsSubject.next(updatedItems);
  }

  private _updateSelectionItemStateForSingleSelect(oid: string): void {
    const updatedItems: C[] = this._itemsSubject.getValue().map((item: C) => {
      if (oid === item.oid) {
        this.length = this.isSelected(oid) ? 1 : 0;
        return { ...item, selected: this.isSelected(oid) };
      }
      return { ...item, selected: false };
    });

    this._itemsSubject.next(updatedItems);
  }
}
