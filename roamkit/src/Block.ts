import { nanoid } from 'nanoid'

export interface Page {
    title: string
    uid?: string
}

export interface Block {
    text: string

    uid?: string
    parentUid?: string

    children?: Blocks
}

export type Blocks = Array<Block>

export function createBlock(text: string, children?: Blocks): Block {
    return { text, children }
}

export function createPage(pageTitle: string, blocks?: Blocks): Page {
    const page: Page = { title: pageTitle, uid: nanoid() };
    window.roamAlphaAPI.createPage({ "page": { "title": page.title, "uid": page.uid } });
    if (blocks === undefined) return page;

    blocks.forEach((b, idx) => write(b, page.uid, idx));
    return page;
}

function write(block: Block, parentUid: string, order: number): void {
    if (block.uid === undefined) block.uid = nanoid();

    window.roamAlphaAPI.createBlock({
        "location": {
            "parent-uid": parentUid,
            "order": order,
        },
        "block": { "string": block.text, "uid": block.uid }
    })
    if (block.children === undefined) return;

    block.children.forEach((c, idx) => write(c, block.uid, idx));
}