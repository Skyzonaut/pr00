create or replace table polar_aide_rubriques
(
    ID              int auto_increment
        primary key,
    DateCreation    datetime            not null,
    DateActivation  datetime            null,
    DateSuppression datetime            null,
    Nom             varchar(70)         not null,
    Keywords        varchar(100)        not null,
    Texte           text                not null,
    NbConsultations mediumint default 0 not null
)
    charset = utf8;

create or replace table polar_annales
(
    Code    varchar(4) default '' not null
        primary key,
    NbPages int(3)                null,
    EnVente int(1)                null
)
    engine = MyISAM
    charset = utf8;

create or replace table polar_annales_pages
(
    pages_code     varchar(7) not null,
    pages_types    varchar(7) not null,
    pages_nbrPages int        not null,
    primary key (pages_code, pages_types)
)
    charset = utf8;

create or replace table polar_annales_reductions
(
    ID              int auto_increment
        primary key,
    Login           varchar(8) not null,
    User            int        null comment 'Utilisateur offrant la réduction',
    Date            datetime   not null,
    Pages           int        not null,
    DateUtilisation datetime   null
)
    charset = latin1;

create or replace index User
    on polar_annales_reductions (User);

create or replace table polar_annales_statistiques
(
    ID                int auto_increment
        primary key,
    Debut             datetime not null,
    Fin               datetime not null,
    NbAnnales         int(5)   not null,
    NbPagesTheoriques int(5)   not null,
    NbPagesReel       int(5)   not null
)
    charset = latin1;

create or replace table polar_annales_sujets
(
    sujet_id          bigint auto_increment
        primary key,
    sujet_uv          varchar(4)                               not null,
    sujet_type        enum ('t', 'u', 'v', 'p', 'q', 'm', 'f') not null,
    sujet_semestre    varchar(1)                               not null,
    sujet_annee       tinyint                                  not null,
    sujet_corrige     tinyint                                  not null,
    sujet_pages       tinyint    default 0                     not null,
    sujet_info        varchar(50)                              not null,
    sujet_commentaire varchar(50)                              not null comment 'Ce commentaire apparaît sur le sommaire',
    sujet_ecarte      tinyint(1) default 0                     not null comment 'Mettre de coté le sujet'
)
    engine = MyISAM
    charset = latin1;

create or replace index sujet_uv
    on polar_annales_sujets (sujet_uv);

create or replace table polar_annales_uvs
(
    uv_code      varchar(7)                                                         not null
        primary key,
    uv_enseignee enum ('Inconnu', 'A', 'P', 'AP', 'Rempl', 'Fin') default 'Inconnu' not null,
    uv_info      varchar(200)                                                       not null,
    uv_enVente   tinyint(1)                                       default 0         not null,
    uv_modif     datetime                                                           not null
)
    engine = MyISAM
    charset = latin1;

create or replace table polar_assos
(
    ID                 int auto_increment
        primary key,
    MailAsso           varchar(50)                                                               not null,
    Asso               varchar(70)                                                               not null,
    President          varchar(50)                                                               not null,
    MailPresident      varchar(50)                                                               null,
    TelPresident       varchar(20)                                                               null,
    Tresorier          varchar(50)                                                               not null,
    MailTresorier      varchar(50)                                                               null,
    TelTresorier       varchar(20)                                                               null,
    MotDePasse         varchar(128)                                                              not null,
    MotDePasseSecurise tinyint(1) default 0                                                      not null,
    DateCreation       datetime                                                                  not null,
    Etat               enum ('Actif', 'DefautPaiement', 'AttenteActivation', 'Clos', 'Supprime') not null
)
    charset = latin1;

create or replace index Asso
    on polar_assos (Asso);

create or replace table polar_assos_comptes
(
    ID                 int auto_increment
        primary key,
    Asso               int               not null,
    Nom                varchar(50)       not null,
    Quota              float             null,
    TarifAsso          tinyint default 1 not null,
    MotDePasse         varchar(128)      not null,
    MotDePasseSecurise tinyint(1)        not null,
    DateCreation       date              not null,
    DateActivation     date              null
)
    charset = latin1;

create or replace table polar_assos_conventions
(
    ID             int auto_increment
        primary key,
    Asso           varchar(50)   not null,
    Date           datetime      not null,
    But            varchar(1000) not null,
    PolarSengage   text          not null,
    AssoSengage    text          not null,
    TypeSignataire varchar(50)   not null,
    NomSignataire  varchar(50)   not null,
    Attestation    int(2)        not null
)
    charset = latin1;

create or replace index Asso
    on polar_assos_conventions (Asso);

create or replace table polar_assos_factures
(
    ID       int auto_increment
        primary key,
    Asso     int      not null,
    Date     datetime not null,
    Montant  float    not null,
    Encaisse int(1)   not null,
    Cheque   int(15)  not null
)
    charset = latin1;

create or replace index Asso
    on polar_assos_factures (Asso);

create or replace table polar_assos_paiement
(
    id             int auto_increment
        primary key,
    Asso           varchar(50)  not null,
    Date           datetime     not null,
    Convention     int          not null,
    But            varchar(150) not null,
    Montant        float        not null,
    Detail         varchar(500) not null,
    TypeSignataire varchar(50)  not null,
    Signataire     varchar(50)  not null,
    Cheque         int(15)      not null,
    DateVirement   date         null
)
    charset = latin1;

create or replace index Asso
    on polar_assos_paiement (Asso);

create or replace index Convention
    on polar_assos_paiement (Convention);

create or replace table polar_billetterie
(
    ID                  int auto_increment
        primary key,
    Titre               varchar(100)    not null,
    Date                datetime        not null,
    Asso                int             null,
    Places              int             null,
    Preinscription      tinyint(1)      not null,
    Contact             varchar(300)    null,
    InfosPreinscription text            null,
    CodesBarres         text            null,
    CBOrientation       enum ('p', 'l') null,
    CBType              varchar(15)     null,
    CBWidth             int(4)          null,
    CBHeight            int(4)          null
)
    charset = latin1;

create or replace index Asso
    on polar_billetterie (Asso);

create or replace table polar_billetterie_organisateurs
(
    Billetterie int not null,
    User        int not null,
    primary key (Billetterie, User)
)
    charset = latin1;

create or replace index User
    on polar_billetterie_organisateurs (User);

create or replace table polar_billetterie_tarifs
(
    ID                int auto_increment
        primary key,
    Evenement         int                         not null,
    Intitule          varchar(300) charset latin1 not null,
    TypeCommande      int                         not null,
    RequireUTC        tinyint(1) default 0        not null,
    RequireBDE        tinyint(1)                  not null,
    Prive             int(1)                      null,
    Adulte            int(1)     default 0        not null,
    Etudiant          int(1)     default 1        not null,
    Personnel         int(1)     default 1        not null,
    Exterieur         int(1)     default 1        not null,
    MaxPlacesCotisant int        default 1        not null
)
    collate = utf8_bin;

create or replace index Evenement
    on polar_billetterie_tarifs (Evenement);

create or replace index TypeCommande
    on polar_billetterie_tarifs (TypeCommande);

create or replace table polar_caisse_article_sauvegarde
(
    ID            bigint auto_increment
        primary key,
    CodeCaisse    int(3)       not null,
    EnVente       int(1)       not null,
    Actif         int(1)       not null,
    Nom           varchar(50)  not null,
    Secteur       int(2)       not null,
    PrixAchat     float        not null,
    PrixVente     float        not null,
    PrixVenteAsso float        not null,
    TVA           float        not null,
    Palier1       int(5)       not null,
    Remise1       float        not null,
    Palier2       int(5)       not null,
    Remise2       float        not null,
    StockInitial  int          null,
    Stock         int          null,
    SeuilAlerte   int          null,
    CodeJS        text         not null,
    Photo         varchar(50)  not null,
    EAN13         varchar(13)  null,
    Auteur        int          null,
    Fournisseur   varchar(200) null,
    Date          datetime     not null
)
    charset = latin1;

create or replace index Auteur
    on polar_caisse_article_sauvegarde (Auteur);

create or replace index CodeCaisse
    on polar_caisse_article_sauvegarde (CodeCaisse);

create or replace index Secteur
    on polar_caisse_article_sauvegarde (Secteur);

create or replace table polar_caisse_articles
(
    ID            bigint auto_increment
        primary key,
    CodeCaisse    int(3)       not null,
    EnVente       int(1)       not null,
    Actif         int(1)       not null,
    Nom           varchar(50)  not null,
    Secteur       int(2)       not null,
    PrixAchat     float        not null,
    PrixVente     float        not null,
    PrixVenteAsso float        not null,
    TVA           float        not null,
    Palier1       int(5)       not null,
    Remise1       float        not null,
    Palier2       int(5)       not null,
    Remise2       float        not null,
    StockInitial  int          null,
    Stock         int          null,
    SeuilAlerte   int          null,
    CodeJS        text         not null,
    Photo         varchar(50)  not null,
    EAN13         varchar(13)  null,
    Auteur        int          null,
    Fournisseur   varchar(200) null,
    Date          datetime     not null
)
    charset = latin1;

create or replace index Auteur
    on polar_caisse_articles (Auteur);

create or replace index CodeCaisse
    on polar_caisse_articles (CodeCaisse);

create or replace index Secteur
    on polar_caisse_articles (Secteur);

create or replace table polar_caisse_articles_payutc
(
    ID       int(20) auto_increment
        primary key,
    Article  bigint(11) not null comment 'ID de l''article Polar',
    IDPayutc int        not null comment 'ID de l''object payutc, tarif normal',
    DateSync datetime   not null comment 'Date de la dernière mise à jour'
)
    charset = latin1;

create or replace index Article
    on polar_caisse_articles_payutc (Article);

create or replace index IDArticle
    on polar_caisse_articles_payutc (ID);

create or replace table polar_caisse_autorisations
(
    ID              int auto_increment
        primary key,
    Token           varchar(23) not null,
    Nom             varchar(70) not null,
    User            int         not null,
    DateCreation    datetime    not null,
    DateSuppression datetime    null
)
    charset = latin1;

create or replace index User
    on polar_caisse_autorisations (User);

create or replace table polar_caisse_cheques
(
    ID               int(15) auto_increment
        primary key,
    NumVente         bigint       not null,
    Date             datetime     not null,
    Numero           int          null,
    Banque           varchar(50)  not null,
    Montant          float        not null,
    Emetteur         varchar(50)  not null,
    Ordre            varchar(50)  not null,
    PEC              int(1)       not null,
    DateEncaissement datetime     null,
    Motif            varchar(500) null
)
    charset = latin1;

create or replace index NumVente
    on polar_caisse_cheques (NumVente);

create or replace index Numero
    on polar_caisse_cheques (Numero);

create or replace table polar_caisse_cheques_manuels
(
    id       int auto_increment
        primary key,
    Client   varchar(150) not null,
    Date     datetime     not null,
    Location int          not null,
    Montant  float        not null,
    Detail   varchar(500) not null,
    Cheque   int(15)      not null
)
    charset = latin1;

create or replace index Location
    on polar_caisse_cheques_manuels (Location);

create or replace table polar_caisse_coffre
(
    ID          int auto_increment
        primary key,
    User        int                              not null,
    Date        datetime                         not null,
    Billets     float                            not null,
    Pieces      float                            not null,
    Echange     enum ('u', 'o', 'n') default 'u' not null,
    Commentaire text                             not null
)
    charset = latin1;

create or replace index User
    on polar_caisse_coffre (User);

create or replace table polar_caisse_detail
(
    ID                  int(15) auto_increment
        primary key,
    `1c`                int(15) not null,
    `2c`                int(15) not null,
    `5c`                int(15) not null,
    `10c`               int(15) not null,
    `20c`               int(15) not null,
    `50c`               int(15) not null,
    `1e`                int(15) not null,
    `2e`                int(15) not null,
    `5e`                int(15) not null,
    `10e`               int(15) not null,
    `20e`               int(15) not null,
    `50e`               int(15) not null,
    `100e`              int(15) not null,
    CBTheorique         float   not null,
    CBReel              float   not null,
    MoneoTheorique      float   not null,
    MoneoReel           float   not null,
    TotalAvantTransfert float   not null,
    VersCaisse          float   not null,
    VersCoffre          float   not null,
    TotalApresTransfert float   not null,
    DernierIDVente      bigint  not null
)
    charset = latin1;

create or replace table polar_caisse_details
(
    ID   int(15) auto_increment
        primary key,
    c1   int(15) not null,
    c2   int(15) not null,
    c5   int(15) not null,
    c10  int(15) not null,
    c20  int(15) not null,
    c50  int(15) not null,
    e1   int(15) not null,
    e2   int(15) not null,
    e5   int(15) not null,
    e10  int(15) not null,
    e20  int(15) not null,
    e50  int(15) not null,
    e100 int(15) not null
)
    charset = latin1;

create or replace table polar_caisse_erreurs
(
    id          int auto_increment
        primary key,
    date        datetime      not null,
    user        int           not null,
    erreur      float         not null,
    diff_cb     float         not null,
    diff_moneo  float         not null,
    cheques_nok int(10)       not null,
    commentaire varchar(1500) not null
)
    charset = latin1;

create or replace index user
    on polar_caisse_erreurs (user);

create or replace table polar_caisse_info
(
    ID          int auto_increment
        primary key,
    Titre       varchar(30)          not null,
    Contenu     longtext             not null,
    DateRetrait date                 not null,
    Actif       tinyint(1) default 1 not null
)
    charset = utf8;

create or replace table polar_caisse_ip
(
    ip   varchar(15)  not null
        primary key,
    Type varchar(500) not null
)
    charset = latin1;

create or replace table polar_caisse_secteurs
(
    Secteur varchar(50) not null,
    Code    int(2)      not null,
    Payutc  int         null,
    primary key (Secteur, Code)
)
    charset = latin1;

create or replace index Code
    on polar_caisse_secteurs (Code);

create or replace table polar_caisse_ventes
(
    ID            bigint auto_increment
        primary key,
    IDVente       bigint                  not null,
    Article       bigint                  not null,
    Quantite      int(15)                 not null,
    Date          datetime                not null,
    Finalise      int(1)                  not null,
    Asso          int(15)                 null,
    Client        varchar(50)             not null,
    Facture       int(1)                  not null,
    PrixFacture   float                   not null,
    MontantTVA    float                   not null,
    Tarif         enum ('normal', 'asso') not null,
    MoyenPaiement varchar(15)             not null,
    Permanencier  int                     not null
)
    charset = latin1;

create or replace index Article
    on polar_caisse_ventes (Article);

create or replace index Asso
    on polar_caisse_ventes (Asso);

create or replace index IDVente
    on polar_caisse_ventes (IDVente);

create or replace index Permanencier
    on polar_caisse_ventes (Permanencier);

create or replace table polar_caisse_ventes_global
(
    ID            bigint auto_increment
        primary key,
    IDVente       bigint                  not null,
    Article       bigint                  not null,
    Quantite      int(15)                 not null,
    Date          datetime                not null,
    Finalise      int(1)                  not null,
    Asso          int(15)                 null,
    Client        varchar(50)             not null,
    Facture       int(1)                  not null,
    PrixFacture   float                   not null,
    MontantTVA    float                   not null,
    Tarif         enum ('normal', 'asso') not null,
    MoyenPaiement varchar(15)             not null,
    Permanencier  int                     not null
)
    charset = latin1;

create or replace index Article
    on polar_caisse_ventes_global (Article);

create or replace index Asso
    on polar_caisse_ventes_global (Asso);

create or replace index IDVente
    on polar_caisse_ventes_global (IDVente);

create or replace index Permanencier
    on polar_caisse_ventes_global (Permanencier);

create or replace table polar_caisse_ventes_payutc
(
    IDVente       int      not null
        primary key,
    IDTransaction int      not null,
    DateVersement datetime null,
    DateAnnule    datetime null
)
    charset = latin1;

create or replace table polar_caisse_virement
(
    ID           int(15) auto_increment
        primary key,
    Date         datetime    not null,
    Emetteur     varchar(50) not null,
    Destinataire varchar(50) not null,
    Montant      float       not null,
    Effectue     int(1)      not null
)
    charset = latin1;

create or replace table polar_caisses
(
    ID               int auto_increment
        primary key,
    Mouvement        int    not null,
    Details          int    not null,
    TheoriqueCB      double not null,
    ReelCB           double not null,
    TheoriqueMoneo   double not null,
    ReelMoneo        double not null,
    TheoriquePayutc  double not null,
    ReelPayutc       double not null,
    TheoriqueEspeces double not null,
    ReelEspeces      double not null,
    EspecesApres     double not null,
    DernierIDVente   int    not null,
    Commentaire      text   not null,
    constraint Details
        unique (Details),
    constraint Mouvement
        unique (Mouvement)
)
    charset = latin1;

create or replace table polar_cheque_emission
(
    ID                  int auto_increment
        primary key,
    cheque_date         datetime     not null,
    cheque_beneficiaire varchar(255) not null,
    cheque_montant      float        not null,
    cheque_raison       varchar(255) not null,
    cheque_numero       varchar(255) not null
)
    charset = utf8;

create or replace table polar_commandes
(
    ID            bigint auto_increment
        primary key,
    Type          int              not null,
    Nom           varchar(50)      null,
    Prenom        varchar(50)      null,
    Mail          varchar(50)      null,
    Asso          int              null,
    DateCommande  datetime         null,
    IPCommande    varchar(20)      null,
    DatePaiement  datetime         null,
    IDVente       bigint           null,
    DatePrete     datetime         null,
    IDPreparateur int              null,
    DateRetrait   datetime         null,
    IDRetrait     int              null,
    DateRetour    datetime         null,
    IDRetour      int              null,
    Panier        int              null,
    Termine       int(1) default 0 not null,
    commentaire   varchar(255)     null
)
    charset = latin1;

create or replace index Asso
    on polar_commandes (Asso);

create or replace index IDPreparateur
    on polar_commandes (IDPreparateur);

create or replace index IDRetour
    on polar_commandes (IDRetour);

create or replace index IDRetrait
    on polar_commandes (IDRetrait);

create or replace index IDVente
    on polar_commandes (IDVente);

create or replace index Type
    on polar_commandes (Type);

create or replace table polar_commandes_contenu
(
    ID           bigint auto_increment
        primary key,
    IDCommande   bigint       not null,
    Detail       varchar(150) null,
    Options      varchar(50)  null,
    Quantite     int(5)       null,
    Article      bigint       null,
    PrixTTC      float        null,
    PrixUnitaire float        null,
    TVA          float        null
)
    charset = latin1;

create or replace index Article
    on polar_commandes_contenu (Article);

create or replace index IDCommande
    on polar_commandes_contenu (IDCommande);

create or replace table polar_commandes_paniers_web
(
    ID             int auto_increment
        primary key,
    TransactionID  int                                                              null,
    DateCreation   datetime                                                         not null,
    DateValidation datetime                                                         null,
    Etat           enum ('filling', 'saved', 'validated', 'sent', 'paid', 'failed') not null,
    User           int                                                              null,
    Mail           varchar(100)                                                     not null,
    IDVente        int                                                              null,
    CommandeGroupe int                                                              null
)
    charset = latin1;

create or replace table polar_commandes_types
(
    ID              int auto_increment
        primary key,
    Nom             varchar(40) not null,
    CodeProduit     int(15)     not null,
    Actif           int(1)      not null,
    RequireCommande int(1)      not null,
    constraint CodeProduit
        unique (CodeProduit)
)
    charset = latin1;

create or replace index Nom
    on polar_commandes_types (Nom);

create or replace table polar_evenementiel
(
    ID          int auto_increment
        primary key,
    Date        datetime    not null,
    Lieu        varchar(50) not null,
    Titre       varchar(50) not null,
    Description text        not null,
    Auteur      int         not null,
    Creation    datetime    not null,
    Photo       varchar(50) not null
)
    charset = latin1;

create or replace index DeposePar
    on polar_evenementiel (Auteur);

create or replace table polar_evenementiel_participants
(
    Evenement   int(5) not null,
    Participant int(5) not null,
    primary key (Evenement, Participant)
)
    charset = latin1;

create or replace index Evenement
    on polar_evenementiel_participants (Evenement);

create or replace index Participant
    on polar_evenementiel_participants (Participant);

create or replace table polar_fournisseurs
(
    ID           int auto_increment
        primary key,
    Nom          varchar(50) not null,
    Description  text        not null,
    DateSupprime datetime    null
)
    charset = latin1;

create or replace table polar_fournisseurs_contacts
(
    ID           int auto_increment
        primary key,
    Fournisseur  int         not null,
    Info         varchar(60) not null,
    Nom          varchar(30) not null,
    DateSupprime datetime    null
)
    charset = latin1;

create or replace index Fournisseur
    on polar_fournisseurs_contacts (Fournisseur);

create or replace table polar_fournisseurs_tickets
(
    ID           int auto_increment
        primary key,
    Fournisseur  int          not null,
    Contact      int          null,
    Nom          varchar(50)  not null,
    Contenu      text         not null,
    NomFichier   varchar(40)  null,
    Fichier      varchar(200) null,
    Date         datetime     not null,
    User         int          not null,
    DateSupprime int          null
)
    charset = latin1;

create or replace index Contact
    on polar_fournisseurs_tickets (Contact);

create or replace index Fournisseur
    on polar_fournisseurs_tickets (Fournisseur, Contact, User);

create or replace index User
    on polar_fournisseurs_tickets (User);

create or replace table polar_jda
(
    id    int auto_increment
        primary key,
    login varchar(10) not null,
    date  datetime    not null
)
    charset = latin1;

create or replace table polar_manuel2_flotte
(
    id            int unsigned auto_increment
        primary key,
    uv            varchar(15)          not null,
    dateAjout     year                 not null,
    en_reparation tinyint(1) default 0 not null
)
    charset = utf8;

create or replace index uv
    on polar_manuel2_flotte (uv);

create or replace table polar_manuel_intervention
(
    manuel int(11) unsigned not null,
    debut  date             not null,
    fin    date             not null,
    motif  text             not null
)
    charset = utf8;

create or replace index manuel
    on polar_manuel_intervention (manuel);

create or replace table polar_manuel_location
(
    ID           tinyint not null,
    Nom          tinyint not null,
    Prenom       tinyint not null,
    Mail         tinyint not null,
    DateCommande tinyint not null,
    DatePaiement tinyint not null,
    DatePrete    tinyint not null,
    DateRetrait  tinyint not null,
    DateRetour   tinyint not null,
    Termine      tinyint not null
)
    engine = MyISAM
    charset = utf8;

create or replace table polar_manuels
(
    id    int(5) auto_increment
        primary key,
    uv    varchar(15) charset utf8 not null,
    photo varchar(150)             not null,
    Actif tinyint                  not null,
    CD    tinyint                  not null,
    constraint uv
        unique (uv)
)
    charset = latin1;

create or replace table polar_manuels_flotte
(
    Manuel int(3)                                       not null,
    Serie  int(3)                                       not null,
    Numero int(3)                                       not null,
    Etat   enum ('stock', 'location', 'rendu', 'perdu') not null,
    primary key (Manuel, Serie, Numero, Etat)
)
    charset = latin1;

create or replace table polar_msdnaa
(
    id     int auto_increment
        primary key,
    login  varchar(20)      not null,
    date   datetime         null,
    envoye int(1) default 0 not null
)
    charset = latin1;

create or replace index login
    on polar_msdnaa (login, date);

create or replace table polar_news
(
    ID     int auto_increment
        primary key,
    Auteur int                        not null,
    Titre  varchar(255)               not null,
    News   longtext                   not null,
    Date   datetime                   not null,
    Etat   enum ('online', 'offline') not null
)
    charset = latin1;

create or replace index auteur
    on polar_news (Auteur);

create or replace table polar_noel
(
    ID              int auto_increment
        primary key,
    noel_user       int  not null,
    noel_user_give  int  not null,
    noel_user_email text not null
)
    charset = utf8;

create or replace table polar_notifications
(
    ID           bigint auto_increment
        primary key,
    ActionID     varchar(50)                      not null,
    Date         datetime                         not null,
    Destinataire int                              not null,
    Icone        varchar(50)                      not null,
    Texte        varchar(500)                     not null,
    Chemin       varchar(100)                     not null,
    Etat         enum ('non-lu', 'lu', 'archive') not null
)
    charset = latin1;

create or replace index ActionID
    on polar_notifications (ActionID);

create or replace index Destinataire
    on polar_notifications (Destinataire);

create or replace index Etat
    on polar_notifications (Etat);

create or replace table polar_parametres
(
    Nom    varchar(50) not null
        primary key,
    Valeur text        not null
)
    charset = latin1;

create or replace table polar_payutc_transferts
(
    ID          int auto_increment
        primary key,
    Date        datetime     not null,
    Montant     float        not null,
    Commentaire varchar(150) not null,
    Virement    int          not null
)
    charset = latin1;

create or replace index Virement
    on polar_payutc_transferts (Virement);

create or replace table polar_perms
(
    id           int auto_increment
        primary key,
    Jour         int(5) not null,
    Creneau      int(5) not null,
    Permanencier int(5) not null
)
    charset = latin1;

create or replace index Permanencier
    on polar_perms (Permanencier);

create or replace table polar_perms_troc
(
    ID       bigint auto_increment
        primary key,
    Semaine  varchar(7) not null,
    Jour     int(5)     not null,
    Creneau  int(5)     not null,
    Donneur  int        not null,
    Receveur int        null
)
    charset = latin1;

create or replace index Donneur
    on polar_perms_troc (Donneur);

create or replace index Receveur
    on polar_perms_troc (Receveur);

create or replace table polar_poster_soutenance
(
    id         int auto_increment
        primary key,
    idCommande int      not null,
    date       datetime not null
)
    charset = utf8;

create or replace table polar_postit
(
    ID      bigint auto_increment
        primary key,
    Module  varchar(50) not null,
    Section varchar(50) null,
    Auteur  int         not null,
    Public  int(1)      not null,
    Date    datetime    not null,
    Message text        not null
)
    charset = latin1;

create or replace index Auteur
    on polar_postit (Auteur);

create or replace index Module
    on polar_postit (Module);

create or replace index Section
    on polar_postit (Section);

create or replace table polar_screen
(
    ID      int(15) auto_increment
        primary key,
    Date    datetime     not null,
    Mail    varchar(50)  not null,
    Nom     varchar(25)  not null,
    Message varchar(150) not null,
    Actif   int(1)       not null
)
    charset = latin1;

create or replace table polar_screen_photos
(
    ID      int(15) auto_increment
        primary key,
    Date    datetime    not null,
    Nom     varchar(50) not null,
    Adresse varchar(60) not null,
    Actif   int(1)      not null
)
    charset = latin1;

create or replace table polar_screen_videos
(
    ID      int(15) auto_increment
        primary key,
    Date    datetime    not null,
    Nom     varchar(50) not null,
    Adresse varchar(60) not null,
    Actif   int(1)      not null
)
    charset = latin1;

create or replace table polar_securite_droits
(
    ID   int(15) not null,
    User int(15) not null,
    primary key (ID, User)
)
    charset = latin1;

create or replace index User
    on polar_securite_droits (User);

create or replace table polar_securite_pages
(
    ID      int auto_increment
        primary key,
    Titre   varchar(150)                                  not null,
    Menu    varchar(150)                                  null,
    Acces   enum ('public', 'member', 'staff', 'private') not null,
    Module  varchar(50)                                   null,
    Section varchar(50)                                   null,
    Postit  enum ('module', 'section')                    null
)
    charset = latin1;

create or replace index Module
    on polar_securite_pages (Module);

create or replace index Section
    on polar_securite_pages (Section);

create or replace table polar_sondages
(
    ID   int(10) auto_increment
        primary key,
    Nom  varchar(100) not null,
    Date datetime     not null,
    Par  int          not null
)
    charset = latin1;

create or replace index Par
    on polar_sondages (Par);

create or replace index polar_sondages_ibfk_1
    on polar_sondages (Par);

create or replace table polar_sondages_jetons
(
    Sondage     int(15) not null,
    Utilisateur int(15) not null,
    primary key (Sondage, Utilisateur)
)
    charset = latin1;

create or replace index Utilisateur
    on polar_sondages_jetons (Utilisateur);

create or replace index polar_sondages_jetons_ibfk_1
    on polar_sondages_jetons (Sondage);

create or replace index polar_sondages_jetons_ibfk_2
    on polar_sondages_jetons (Utilisateur);

create or replace table polar_sondages_questions
(
    ID       int(10) auto_increment
        primary key,
    Sondage  int(10)                              not null,
    Question varchar(100)                         not null,
    Type     enum ('unique', 'multiple', 'libre') not null
)
    charset = latin1;

create or replace index Sondage
    on polar_sondages_questions (Sondage);

create or replace table polar_sondages_questions_v2
(
    ID       int auto_increment
        primary key,
    Sondage  int                                  not null,
    Question text                                 not null,
    Type     enum ('unique', 'multiple', 'libre') not null
)
    charset = latin1;

create or replace table polar_sondages_reponses
(
    ID       int(10) auto_increment
        primary key,
    Question int(10)      not null,
    Reponse  varchar(100) not null,
    NbVotes  int(10)      not null
)
    charset = latin1;

create or replace index Question
    on polar_sondages_reponses (Question);

create or replace table polar_sondages_reponses_libres
(
    Question int  not null
        primary key,
    Reponse  text not null
)
    charset = latin1;

create or replace table polar_sondages_reponses_v2
(
    ID       int auto_increment
        primary key,
    Question int          not null,
    Reponse  varchar(200) not null,
    Image    varchar(300) null
)
    charset = latin1;

create or replace table polar_sondages_v2
(
    ID       int auto_increment
        primary key,
    Titre    varchar(200) not null,
    Date     datetime     not null,
    Createur int          not null
)
    charset = latin1;

create or replace table polar_sondages_votes
(
    Reponse int not null,
    User    int not null,
    primary key (Reponse, User)
)
    charset = latin1;

create or replace table polar_tickets
(
    id       mediumint auto_increment
        primary key,
    subject  varchar(255)                                   not null,
    author   varchar(50)                                    not null,
    category mediumint                                      not null,
    opened   datetime                                       not null,
    status   enum ('new', 'active', 'closed') default 'new' not null,
    Salt     varchar(8)                                     not null
)
    charset = latin1;

create or replace index author
    on polar_tickets (author);

create or replace index category
    on polar_tickets (category);

create or replace table polar_tickets_categories
(
    id            mediumint auto_increment
        primary key,
    Nom           varchar(255) collate utf8_unicode_ci          not null,
    Description   varchar(500)                                  not null,
    Objets        text                                          not null,
    template      text                                          not null,
    acces         enum ('public', 'member', 'staff', 'private') not null,
    GenererCheque int(1) default 0                              not null
)
    charset = latin1;

create or replace table polar_tickets_cheques
(
    Ticket mediumint not null,
    Cheque int       not null,
    constraint Ticket
        unique (Ticket, Cheque)
)
    charset = latin1;

create or replace index Cheque
    on polar_tickets_cheques (Cheque);

create or replace table polar_tickets_messages
(
    id      mediumint auto_increment
        primary key,
    ticket  mediumint   not null,
    sender  varchar(50) not null,
    sent    datetime    not null,
    message text        not null
)
    charset = latin1;

create or replace index sender
    on polar_tickets_messages (sender);

create or replace index ticket
    on polar_tickets_messages (ticket);

create or replace table polar_tickets_responsables
(
    Categorie   mediumint(15) not null,
    Utilisateur int(15)       not null,
    primary key (Categorie, Utilisateur)
)
    charset = latin1;

create or replace index Utilisateur
    on polar_tickets_responsables (Utilisateur);

create or replace table polar_utilisateurs
(
    ID                 int auto_increment
        primary key,
    IPClient           varchar(20)          not null,
    DateCreation       datetime             not null,
    Login              varchar(8)           not null,
    MotDePasse         varchar(128)         not null,
    MotDePasseSecurise tinyint(1) default 0 not null,
    Email              varchar(50)          not null,
    Staff              int(1)     default 0 not null,
    Bureau             int(1)     default 0 not null,
    Ancien             int(1)     default 0 not null,
    Responsable        int(2)               null,
    Poste              varchar(150)         null,
    Presentation       text                 not null,
    Nom                varchar(150)         not null,
    Prenom             varchar(150)         not null,
    Sexe               enum ('m', 'f')      null,
    Telephone          varchar(10)          null,
    Newsletter         tinyint    default 1 not null
)
    charset = latin1;

create or replace index Responsable
    on polar_utilisateurs (Responsable);

create or replace table polar_utilisateurs_new
(
    ID           int auto_increment
        primary key,
    Login        varchar(8)  not null,
    Prenom       varchar(50) not null,
    Nom          varchar(50) not null,
    Email        varchar(50) not null,
    Password     varchar(32) not null,
    Verification varchar(32) not null,
    Creation     datetime    not null
)
    charset = latin1;

create or replace table polar_wallpaper
(
    ID                int auto_increment
        primary key,
    ImageFileName     varchar(100) not null,
    ThumbnailFileName varchar(100) not null,
    Date              datetime     not null,
    UserCreatorID     int          not null
)
    charset = utf8;

create or replace index UserCreatorID
    on polar_wallpaper (UserCreatorID);

create or replace table polar_wallpaper_storage
(
    ID                int auto_increment
        primary key,
    Year              smallint     not null,
    Week              smallint     not null,
    ImageFileName     varchar(100) not null,
    ThumbnailFileName varchar(100) not null,
    Date              datetime     not null,
    UserCreatorID     int          not null
)
    charset = utf8;

create or replace index UserCreatorID
    on polar_wallpaper_storage (UserCreatorID);

create or replace table polar_wallpaper_votes
(
    UserID      int not null
        primary key,
    WallpaperID int not null
)
    charset = utf8;

create or replace index WallpaperID
    on polar_wallpaper_votes (WallpaperID);

create or replace table polar_wiki
(
    ID        int auto_increment
        primary key,
    Page      int(5)       not null,
    Categorie int(3)       not null,
    Titre     varchar(200) not null,
    Contenu   text         not null,
    Auteur    int          not null,
    Date      datetime     not null
)
    charset = latin1;

create or replace index Auteur
    on polar_wiki (Auteur);

create or replace index Categorie
    on polar_wiki (Categorie);

create or replace index Page
    on polar_wiki (Page);

create or replace table polar_wiki_categories
(
    ID  int auto_increment
        primary key,
    Nom varchar(200) not null
)
    charset = latin1;

