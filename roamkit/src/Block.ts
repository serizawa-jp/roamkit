import { nanoid } from 'nanoid'

interface Page {
    title: string
    uid?: string
}

interface Block {
    text: string

    uid?: string
    parentUid?: string

    children?: Blocks
}

type Blocks = Array<Block>

export function createBlock(text: string, children?: Blocks): Block {
    return { text, children }
}

export function createPage(pageTitle: string): Page {
    const page: Page = { title: pageTitle, uid: nanoid() };
    return page;
}

export function writePage(page: Page, blocks?: Blocks): void {
    if (page.uid === undefined) page.uid = nanoid();

    window.roamAlphaAPI.createPage({ "page": { "title": page.title, "uid": page.uid } });

    if (blocks === undefined) return;
    writeBlocks(blocks, page.uid);
}

export function writeBlocks(blocks: Blocks, parentUid: string): void {
    blocks.forEach((b, idx) => writeBlock(b, parentUid, idx));
}

export function writeBlock(block: Block, parentUid: string, order: number): void {
    if (block.uid === undefined) block.uid = nanoid();

    window.roamAlphaAPI.createBlock({
        "location": {
            "parent-uid": parentUid,
            "order": order,
        },
        "block": { "string": block.text, "uid": block.uid }
    })
    if (block.children === undefined) return;

    block.children.forEach((c, idx) => writeBlock(c, block.uid, idx));
}
