import { ProductItem } from '../common/types';

type MergeOf<T> = {
    oldItem: T;
    newItem: T;
};

export class ProductDiff {
    private oldItem: ProductItem[];
    private newItem: ProductItem[];

    constructor(oldItem: ProductItem[] = [], newItem: ProductItem[] = []) {
        this.oldItem = oldItem;
        this.newItem = newItem;
    }

    removed(): ProductItem[] {
        return this.oldItem.filter(
            ({ title: oldTitle }) =>
                !this.newItem.some(
                    ({ title: newTitle }) => newTitle === oldTitle
                )
        );
    }

    merged(): MergeOf<ProductItem>[] {
        return this.oldItem.reduce<MergeOf<ProductItem>[]>((result, item) => {
            const { title: oldTitle, price: oldPrice } = item;
            const match = this.newItem.find(
                ({ title: newTitle, price: newPrice }) =>
                    newTitle === oldTitle && oldPrice !== newPrice
            );

            if (match) {
                result.push({
                    oldItem: item,
                    newItem: match,
                });
            }

            return result;
        }, []);
    }

    added(): ProductItem[] {
        return this.newItem.filter(
            ({ title: newTitle }) =>
                !this.oldItem.some(
                    ({ title: oldTitle }) => oldTitle === newTitle
                )
        );
    }
}
