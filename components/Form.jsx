import Link from 'next/link'

export const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
    return (
        <section className='w-full max-w-full flex-start flex-col mt-14'>
            <h1 className='head_text text-left'>{type} Postes</h1>
            <p className='desc text-left max-w-md'>
                {type} et Partager de bells astuces, reccette, idées au monde et laissé votre savoir faire et votre créativité vous fait profit par des relation
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Votre Sujet
                    </span>

                    <textarea
                        value={post.prompt}
                        onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                        placeholder='Ecrivez votre sujet ici...'
                        required
                        className='form_textarea'
                    ></textarea>
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Tag {' '}
                        <span className='text-gray-500 font-normal'>(#produit, #recette, #idée)</span>
                    </span>

                    <input
                        value={post.tag}
                        onChange={(e) => setPost({ ...post, tag: e.target.value })}
                        placeholder='#tag'
                        required
                        className='form_input'
                    ></input>
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href="/" className='text-gray-500 text-sm'>
                        Retour
                    </Link>

                    <button
                        type='"Soumettre'
                        disabled={submitting}
                        className='blue_btn'

                    >
                        {submitting ? 'Soumission...' : "Soumettre"}
                    </button>
                </div>


            </form>
        </section>
    )
}
