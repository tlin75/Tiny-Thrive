// for typescript to recognise mp3 file
declare module "*.mp3" {
    const src: string;
    export default src;
}