import { Feed } from "@components/Feed";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-24">
      <h1 className='head_text text-center'>
        Créer & Partager
        <br className='max-md:hidden' />
        <span className='blue_gradient text-center'>Des Idées et Astuces</span>
      </h1>

      <p className='desc text-center '>
      Z-Idea est un projet open source pour partager des idées et De techniques de développement du quotidient et ausi discuter sur différent sujet de développement social.
      </p>

      <Feed/>
    </section>
  )
}
